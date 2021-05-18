import { MouseEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  decreaseProductAmount,
  increaseProductAmount,
  updateCheckedProductItems,
  updateProductAmount,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import { AMOUNT_COUNTER_FLAG, CONFIRM_MESSAGE, ROUTE } from '../../../constant';

import ScreenContainer from '../../../style/ScreenContainer';

import { ProductType } from '../../../type';
import Header from '../../atom/Header/Header';

import ShoppingCartLayout from '../../template/ShoppingCartLayout/ShoppingCartLayout';

const ShoppingCartPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    myShoppingCartId,
    myShoppingCartProductIds,
    productList,
    checkedProductList,
    productAmountDict,
  } = useSelector(
    ({
      myShoppingCartReducer,
      productListReducer,
      checkedProductReducer,
      productAmountDictReducer,
    }: RootState) => ({
      myShoppingCartId: myShoppingCartReducer.myShoppingCart.id,
      myShoppingCartProductIds:
        myShoppingCartReducer.myShoppingCart.productIdList,
      productList: productListReducer.productList,
      checkedProductList: checkedProductReducer.checkedProductList,
      productAmountDict: productAmountDictReducer.productAmountDict,
    })
  );

  const [isAllChecked, setAllChecked] = useState(false);

  const expectedPrice = checkedProductList.reduce(
    (acc: number, productId: string) => {
      const amount = productAmountDict[productId] || 0;
      const targetProduct = productList.find(
        (product: ProductType) => product.id === productId
      );

      if (!targetProduct) return acc;

      return acc + Number(targetProduct.price) * amount;
    },
    0
  );

  const onClickAllCheckBox = () => {
    const newAllCheckedState = !isAllChecked;
    if (newAllCheckedState) {
      dispatch(updateCheckedProductItems([...myShoppingCartProductIds]));
    } else {
      dispatch(updateCheckedProductItems([]));
    }

    setAllChecked(newAllCheckedState);
  };

  const onClickCheckBox = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      dispatch(updateCheckedProductItems([...checkedProductList, target.id]));
    } else {
      dispatch(
        updateCheckedProductItems(
          checkedProductList.filter(
            (productId: string) => productId !== target.id
          )
        )
      );
    }
  };

  const onClickDeleteButton = (targetId: string | null): void => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    if (targetId) {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(
          (productId) => productId !== targetId
        ),
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(
        () =>
          Promise.all([
            dispatch(updateProductAmount(targetId)),
            dispatch(
              updateCheckedProductItems(
                checkedProductList.filter(
                  (checkedProductId: string) => checkedProductId !== targetId
                )
              )
            ),
          ])
      );
    } else {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(
          (productId) => !checkedProductList.includes(productId)
        ),
      };

      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(
        () =>
          Promise.all([
            myShoppingCartProductIds.map((productId: string) =>
              dispatch(updateProductAmount(productId))
            ),
            dispatch(updateCheckedProductItems([])),
          ])
      );
    }
  };

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.PURCHASE)) return;

    const newContent = {
      productIdList: myShoppingCartProductIds.filter(
        (productId) => !checkedProductList.includes(productId)
      ),
    };
    const checkedItemList = [...checkedProductList].map((id) => ({
      id,
      amount: productAmountDict[id],
    }));

    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent))
      .then(() =>
        Promise.all(
          checkedProductList.map((productId: string) =>
            dispatch(updateProductAmount(productId))
          )
        )
      )
      .then(() => {
        dispatch(updateCheckedProductItems([]));

        history.push({
          pathname: ROUTE.ORDER_CHECKOUT,
          state: {
            checkedItemList,
          },
        });
      });
  };

  const onClickAmountCounter = (productId: string, flag: string) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(increaseProductAmount(productId));
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(decreaseProductAmount(productId));
    }
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>
      <ShoppingCartLayout
        productList={productList}
        productAmountDict={productAmountDict}
        onClickCheckBox={onClickCheckBox}
        onClickAmountCounter={onClickAmountCounter}
        myShoppingCartProductIds={myShoppingCartProductIds}
        onClickAllCheckBox={onClickAllCheckBox}
        isAllChecked={isAllChecked}
        onClickDeleteButton={onClickDeleteButton}
        checkedProductIdList={checkedProductList}
        expectedPrice={expectedPrice}
        onClickPaymentButton={onClickPaymentButton}
      />
    </ScreenContainer>
  );
};

export default ShoppingCartPage;
