import { MouseEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  OptionContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
  ShoppingCartList,
  PaymentInfoBoxContainer,
  ShoppingCartItemContainer,
  ShoppingCartItem,
  ShoppingCartItemOption,
  DeleteButton,
  EmptyPageImage,
} from './ShoppingCartPage.styles';
import { RootState } from '../../../redux/store';
import {
  decreaseProductAmount,
  increaseProductAmount,
  updateCheckedProductItems,
  updateProductAmount,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import { AMOUNT_COUNTER_FLAG, CONFIRM_MESSAGE, ROUTE } from '../../../constant';
import { ProductProps } from '../../../type';
import ScreenContainer from '../../../style/ScreenContainer';
import emptyImage from '../../../asset/img/empty_page.png';
import { numberWithCommas } from '../../../util';
import {
  AmountCounter,
  CheckBox,
  Header,
  PaymentInfoBox,
  RowProductItem,
  TrashCanIcon,
} from '../..';

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

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

  const [expectedPrice, setExpectedPrice] = useState(0);

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

  const onClickDeleteButton = async (targetId: string | null) => {
    if (!window.confirm(CONFIRM_MESSAGE.DELETE)) return;

    if (targetId) {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(
          (productId) => productId !== targetId
        ),
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
      dispatch(updateProductAmount(targetId));
      dispatch(
        updateCheckedProductItems(
          checkedProductList.filter(
            (checkedProductId: string) => checkedProductId !== targetId
          )
        )
      );
    } else {
      const newContent = {
        productIdList: myShoppingCartProductIds.filter(
          (productId) => !checkedProductList.includes(productId)
        ),
      };
      const res = await Promise.all(
        myShoppingCartProductIds.map((productId: string) =>
          dispatch(updateProductAmount(productId))
        )
      );

      console.log('res', res);

      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
      dispatch(updateCheckedProductItems([]));
    }
  };

  const onClickPaymentButton = async () => {
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

    dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    const res = await Promise.all(
      checkedProductList.map((productId: string) =>
        dispatch(updateProductAmount(productId))
      )
    );

    console.log('res', res);

    dispatch(updateCheckedProductItems([]));

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedItemList,
      },
    });
  };

  const onClickAmountCounter = (productId: string, flag: string) => {
    if (flag === AMOUNT_COUNTER_FLAG.UP) {
      dispatch(increaseProductAmount(productId));
    } else if (flag === AMOUNT_COUNTER_FLAG.DOWN) {
      dispatch(decreaseProductAmount(productId));
    }
  };

  useEffect(() => {
    const newExpectedPrice = checkedProductList.reduce(
      (acc: number, productId: string) => {
        const amount = productAmountDict[productId] || 0;
        const { price } = productList.find(
          (product: ProductProps) => product.id === productId
        );

        return acc + price * amount;
      },
      0
    );

    setExpectedPrice(newExpectedPrice);
  }, [
    checkedProductList,
    myShoppingCartProductIds,
    productAmountDict,
    productList,
  ]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>
      <Container>
        {myShoppingCartProductIds.length === 0 ? (
          <EmptyPageImage src={emptyImage} alt="empty page" />
        ) : (
          <>
            <ShoppingCartContainer>
              <OptionContainer>
                <CheckBox
                  id="all-check"
                  onClick={onClickAllCheckBox}
                  isChecked={isAllChecked}
                />
                <span>모두선택</span>
                <DeleteButton
                  onClick={() => onClickDeleteButton(null)}
                  disabled={!checkedProductList.length}
                >
                  상품삭제
                </DeleteButton>
              </OptionContainer>

              <ShoppingCartListTitle>{`장바구니 상품 (${myShoppingCartProductIds.length}개)`}</ShoppingCartListTitle>

              <ShoppingCartList>
                {myShoppingCartProductIds.map((productId: string) => {
                  const isChecked: boolean =
                    checkedProductList.includes(productId);
                  const { img, name, price } = productList.find(
                    ({ id }: ProductProps) => id === productId
                  );
                  const amount = productAmountDict[productId] || 1;
                  if (!productAmountDict[productId]) {
                    dispatch(updateProductAmount(productId));
                  }

                  return (
                    <ShoppingCartItemContainer key={productId}>
                      <ShoppingCartItem>
                        <CheckBox
                          id={productId}
                          onClick={onClickCheckBox}
                          isChecked={isChecked}
                        />
                        <RowProductItem img={img} name={name} />
                      </ShoppingCartItem>

                      <ShoppingCartItemOption>
                        <button
                          type="button"
                          onClick={() => onClickDeleteButton(productId)}
                        >
                          <TrashCanIcon />
                        </button>
                        <AmountCounter
                          value={amount}
                          onClickUp={() =>
                            onClickAmountCounter(productId, 'up')
                          }
                          onClickDown={() =>
                            onClickAmountCounter(productId, 'down')
                          }
                        />
                        <span>{`${numberWithCommas(price * amount)}원`}</span>
                      </ShoppingCartItemOption>
                    </ShoppingCartItemContainer>
                  );
                })}
              </ShoppingCartList>
            </ShoppingCartContainer>

            <PaymentInfoBoxContainer>
              <PaymentInfoBox
                title="결제예상금액"
                detailText="결제예상금액"
                price={`${numberWithCommas(expectedPrice)} 원`}
                buttonText={`주문하기(${checkedProductList.length}개)`}
                onClick={onClickPaymentButton}
                isDisable={!checkedProductList.length}
              />
            </PaymentInfoBoxContainer>
          </>
        )}
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;
