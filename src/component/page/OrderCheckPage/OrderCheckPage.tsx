import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Location } from 'history';

import { RootState } from '../../../redux/store';
import { useServerAPI } from '../../../hook';
import { CONFIRM_MESSAGE, ROUTE, SCHEMA } from '../../../constant';
import { ProductProps } from '../../../type';
import ScreenContainer from '../../../style/ScreenContainer';
import { Header, PaymentInfoBox, RowProductItem } from '../..';
import { numberWithCommas } from '../../../util';
import {
  CheckoutListContainer,
  Container,
  CheckoutListTitle,
  CheckoutList,
  PaymentInfoBoxContainer,
} from './OrderCheckPage.styles';

interface CheckedItemListState {
  id: string;
  amount: number;
}

interface LocationState extends Location {
  checkedItemList: Array<CheckedItemListState>;
}


const OrderCheckoutPage = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { productList } = useSelector(({ productListReducer }: RootState) => ({
    productList: productListReducer.productList,
  }));

  const { postData: createOrder } = useServerAPI([], SCHEMA.ORDER);
  const [expectedPrice, setExpectedPrice] = useState(0);

  if (!location.state) {
    history.replace({
      pathname: ROUTE.HOME,
    });
  }

  const checkedItemList = location.state?.checkedItemList;

  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.CHECKOUT)) return;

    const content = {
      orderedProductList: checkedItemList.map(({ id, amount }) => ({
        id,
        amount,
      })),
    };

    createOrder(content);

    history.push({
      pathname: ROUTE.ORDER_LIST,
    });
  };

  useEffect(() => {
    const newExpectedPrice = checkedItemList.reduce((acc, { id, amount }) => {
      const { price } = productList.find(
        (product: ProductProps) => product.id === id
      );

      return acc + price * amount;
    }, 0);

    setExpectedPrice(newExpectedPrice);
  }, [checkedItemList, productList]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문/결제</Header>

      <Container>
        <CheckoutListContainer>
          <CheckoutListTitle>{`주문 상품 ( ${
            checkedItemList?.length || 0
          }건 )`}</CheckoutListTitle>

          <CheckoutList>
            {checkedItemList?.map(({ id, amount }) => {
              const { img, name } = productList.find(
                (product: ProductProps) => product.id === id
              );

              return (
                <RowProductItem
                  key={id}
                  img={img}
                  name={name}
                  amount={`수량: ${amount} 개`}
                />
              );
            })}
          </CheckoutList>
        </CheckoutListContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제금액"
            detailText="총 결제금액"
            price={`${numberWithCommas(expectedPrice)} 원`}
            buttonText={`${numberWithCommas(expectedPrice)}원 결제하기`}
            onClick={onClickPaymentButton}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
