import { OrderType, ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import Button from '../../atom/Button/Button';
import OrderContainer from '../../molecule/OrderContainer/OrderContainer';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import { Container, OrderItemContainer } from './OrderListLayout.styles';

interface OrderListLayoutProps {
  orderList: Array<OrderType>;
  productList: Array<ProductType>;
  onClickShoppingCartButton: (id: string) => void;
}

const OrderListLayout = ({
  orderList,
  productList,
  onClickShoppingCartButton,
}: OrderListLayoutProps) => (
  <>
    <Container>
      {orderList.map((order: OrderType) => (
        <OrderContainer key={order.id} orderId={order.id}>
          {order.orderedProductList?.map(({ id, amount }) => {
            const targetProduct = productList.find(
              (product: ProductType) => product.id === id
            );

            if (!targetProduct) return null;

            const { img, name, price } = targetProduct;

            return (
              <OrderItemContainer key={id}>
                <RowProductItem
                  img={img}
                  name={name}
                  price={`${numberWithCommas(Number(price) * amount)} 원 / `}
                  amount={`수량: ${amount} 개`}
                />
                <Button onClick={() => onClickShoppingCartButton(id)}>
                  장바구니
                </Button>
              </OrderItemContainer>
            );
          })}
        </OrderContainer>
      ))}
    </Container>
  </>
);

export default OrderListLayout;
