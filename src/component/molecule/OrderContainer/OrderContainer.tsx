import { Container, Header, ProductList } from './OrderContainer.styles';

interface OrderContainerProps {
  orderId: string;
  children: React.ReactNode;
}
const OrderContainer = ({ orderId, children }: OrderContainerProps) => (
  <Container>
    <Header>
      <span>{`주문번호: ${orderId}`}</span>
      <span>상세보기</span>
    </Header>
    <ProductList>{children}</ProductList>
  </Container>
);

export default OrderContainer;
export type { OrderContainerProps };
