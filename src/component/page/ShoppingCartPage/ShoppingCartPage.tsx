import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AMOUNT_COUNTER_FLAG, CONFIRM_MESSAGE, ROUTE } from '../../../constant';
import {
  checkProduct,
  decreaseProductAmount,
  increaseProductAmount,
  initShoppingCartItemAsync,
  removeShoppingCartItemAsync,
  unCheckProduct,
} from '../../../redux/action';
import { AppDispatch, RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { CartProductDetailType } from '../../../type';
import Header from '../../atom/Header/Header';
import ShoppingCartLayout from '../../template/ShoppingCartLayout/ShoppingCartLayout';
// TODO: re-export 하기
const ShoppingCartPage = ({ history, location }: RouteComponentProps) => {
  // TODO: 다른 dispatch 들도 타입선언해주기
  const dispatch = useDispatch<AppDispatch>();
  const [isAllChecked, setAllChecked] = useState(false);

  const { shoppingCartProducts } = useSelector(
    ({ myShoppingCartReducer }: RootState) => ({
      shoppingCartProducts: myShoppingCartReducer.products,
    })
  );

  const checkedProductList: Array<CartProductDetailType> = Object.values(
    shoppingCartProducts
  ).filter((product) => product.checked);

  const expectedPrice = Object.values(shoppingCartProducts)
    .filter((product) => product.checked)
    .reduce((acc: number, product: CartProductDetailType) => {
      const { price, quantity } = product;

      return acc + Number(price) * quantity;
    }, 0);

  const onClickAllCheckBox = () => {
    const newAllChecked = !isAllChecked;

    Promise.all(
      Object.values(shoppingCartProducts).map((product) =>
        newAllChecked
          ? dispatch(checkProduct(product))
          : dispatch(unCheckProduct(product))
      )
    ).then(() => {
      setAllChecked(newAllChecked);
    });
  };

  const onClickCheckBox = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      checkedProductList.push(shoppingCartProducts[target.id]);
      dispatch(checkProduct(shoppingCartProducts[target.id]));
    } else {
      const targetIndex = checkedProductList.findIndex(
        (product) => product.product_id === target.id
      );
      if (!targetIndex) return;
      checkedProductList.splice(targetIndex, 1);
      dispatch(unCheckProduct(shoppingCartProducts[target.id]));
    }
  };

  // TODO: "모두 삭제"와 분리
  const onClickDeleteButton = (targetId: string | null): void => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    if (targetId) {
      removeShoppingCartItemAsync(shoppingCartProducts[targetId])(dispatch); // 오류가 발생해서 커링 처리
    } else {
      Promise.all(
        Object.values(shoppingCartProducts).map(
          (product: CartProductDetailType) =>
            removeShoppingCartItemAsync(product)(dispatch)
        )
      );
    }
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedProductList,
      },
    });
  };

  const onClickAmountCounter = (productId: string, flag: string) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(increaseProductAmount(shoppingCartProducts[productId]));
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(decreaseProductAmount(shoppingCartProducts[productId]));
    }
  };

  useEffect(() => {
    initShoppingCartItemAsync(shoppingCartProducts)(dispatch);
  }, [dispatch, shoppingCartProducts]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>
      <ShoppingCartLayout
        shoppingCartProducts={shoppingCartProducts}
        checkedProductList={checkedProductList}
        onClickCheckBox={onClickCheckBox}
        onClickAmountCounter={onClickAmountCounter}
        onClickAllCheckBox={onClickAllCheckBox}
        isAllChecked={isAllChecked}
        onClickDeleteButton={onClickDeleteButton}
        expectedPrice={expectedPrice}
        onClickPaymentButton={onClickPaymentButton}
      />
    </ScreenContainer>
  );
};

export default ShoppingCartPage;
