import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Redirect, useHistory, useLocation } from 'react-router';
import { CONFIRM_MESSAGE, ROUTE, SCHEMA } from '../../../constant';
import { useServerAPI } from '../../../hook';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductType } from '../../../type';
import Header from '../../atom/Header/Header';
import OrderCheckoutLayout from '../../template/OrderCheckLayout/OrderCheckLayout';

interface CheckedItemState {
  id: string;
  amount: number;
}

const OrderCheckoutPage = ({ history, location }: RouteComponentProps) => {
  const { productList } = useSelector(({ productListReducer }: RootState) => ({
    productList: productListReducer.productList,
  }));

  const { postData: createOrder } = useServerAPI([], SCHEMA.ORDER);

  if (!location.state) return <Redirect to={ROUTE.HOME} />;

  const {
    pathname,
    state: { checkedItemList },
  } = location as {
    pathname: string;
    state: {
      checkedItemList: Array<CheckedItemState>;
    };
  };

  const expectedPrice = checkedItemList.reduce(
    (acc: number, { id, amount }: CheckedItemState) => {
      const targetProduct = productList.find(
        (product: ProductType) => product.id === id
      );

      if (!targetProduct) return acc;

      return acc + Number(targetProduct.price) * amount;
    },
    0
  );
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

  return (
    <ScreenContainer route={pathname}>
      <Header>주문/결제</Header>

      <OrderCheckoutLayout
        productList={productList}
        checkedItemList={checkedItemList}
        expectedPrice={expectedPrice}
        onClickPaymentButton={onClickPaymentButton}
      />
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
