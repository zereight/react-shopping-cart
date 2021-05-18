import React from 'react';
import { ProductType, CheckedItemType } from '../../../type';
import { numberWithCommas } from '../../../util';
import PaymentInfoBox from '../../molecule/PaymentInfoBox/PaymentInfoBox';
import CheckoutProductList from '../../organism/CheckoutProductList/CheckoutProductList';
import {
  Container,
  CheckoutListTitle,
  CheckoutListContainer,
  PaymentInfoBoxContainer,
} from './OrderCheckLayout.styles';

interface OrderCheckoutLayoutProps {
  productList: Array<ProductType>;
  checkedItemList: Array<CheckedItemType>;
  expectedPrice: number;
  onClickPaymentButton: React.MouseEventHandler<HTMLButtonElement>;
}

const OrderCheckoutLayout = ({
  productList,
  checkedItemList,
  expectedPrice,
  onClickPaymentButton,
}: OrderCheckoutLayoutProps) => (
  <>
    <Container>
      <CheckoutListContainer>
        <CheckoutListTitle>{`주문 상품 ( ${
          checkedItemList.length || 0
        }건 )`}</CheckoutListTitle>

        <CheckoutProductList
          productList={productList}
          checkedItemList={checkedItemList}
        />
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
  </>
);

export default OrderCheckoutLayout;
export type { OrderCheckoutLayoutProps };