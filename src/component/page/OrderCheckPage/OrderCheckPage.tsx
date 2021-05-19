import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { CONFIRM_MESSAGE, ROUTE } from '../../../constant';
import { useServerAPI } from '../../../hook';
import { removeShoppingCartItem } from '../../../redux/action';
import ScreenContainer from '../../../style/ScreenContainer';
import { CartProductDetailType } from '../../../type';
import Header from '../../atom/Header/Header';
import OrderCheckoutLayout from '../../template/OrderCheckLayout/OrderCheckLayout';

const OrderCheckoutPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();
  // TODO: 굳이 이렇게 써야할까?
  const { postData: createOrder } = useServerAPI(
    `/api/customers/zereight/orders`
  );

  if (!location.state) return <Redirect to={ROUTE.HOME} />;

  const {
    pathname,
    state: { checkedProductList },
  } = location as {
    pathname: string;
    state: {
      checkedProductList: Array<CartProductDetailType>;
    };
  };

  const expectedPrice = checkedProductList.reduce(
    (acc: number, product: CartProductDetailType) =>
      acc + Number(product.price) * product.quantity,
    0
  );
  const onClickPaymentButton = () => {
    if (!window.confirm(CONFIRM_MESSAGE.CHECKOUT)) return;

    const newOrder = checkedProductList.map((product) => ({
      cart_id: product.cart_id,
      quantity: product.quantity,
    }));

    createOrder('/api/customers/zereight/orders', newOrder).then(() => {
      Promise.all(
        checkedProductList.map((product) =>
          dispatch(removeShoppingCartItem(product))
        )
      ).then(() => {
        history.push({
          pathname: ROUTE.ORDER_LIST,
        });
      });
    });
  };

  return (
    <ScreenContainer route={pathname}>
      <Header>주문/결제</Header>

      <OrderCheckoutLayout
        checkedProductList={checkedProductList}
        expectedPrice={expectedPrice}
        onClickPaymentButton={onClickPaymentButton}
      />
    </ScreenContainer>
  );
};

export default OrderCheckoutPage;
