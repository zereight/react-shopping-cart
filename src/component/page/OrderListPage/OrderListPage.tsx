import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { numberWithCommas } from '../../../util';
import { RootState } from '../../../redux/store';
import { useModal, useServerAPI } from '../../../hook';
import { ROUTE, SCHEMA } from '../../../constant';
import { OrderState, ProductProps } from '../../../type';
import {
  increaseProductAmount,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import ScreenContainer from '../../../style/ScreenContainer';
import { Button, Header, Modal, RowProductItem } from '../..';
import { OrderContainer, SuccessAddedModal } from '../../template';
import { Container, OrderItemContainer } from './OrderListPage.styles';
import { ModalPortal } from '../../../portal';

const OrderListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    myShoppingCartId,
    myShoppingCartProductIds,
    productList,
    likedProductIdList,
  } = useSelector(
    ({
      myShoppingCartReducer,
      productListReducer,
      likedProductIdListReducer,
    }: RootState) => ({
      myShoppingCartId: myShoppingCartReducer.myShoppingCart.id,
      myShoppingCartProductIds:
        myShoppingCartReducer.myShoppingCart.productIdList,
      productList: productListReducer.productList,
      likedProductIdList: likedProductIdListReducer.likedProductIdList,
    })
  );

  const { value: orderList } = useServerAPI([], SCHEMA.ORDER);

  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);

  const likedProductList = likedProductIdList.map((likedProductId) =>
    productList.find((product: ProductProps) => likedProductId === product.id)
  );

  const onClickShoppingCartButton = (productId: string) => {
    if (myShoppingCartProductIds.includes(productId)) {
      dispatch(increaseProductAmount(productId));
    } else {
      const newContent = {
        productIdList: [...new Set([...myShoppingCartProductIds, productId])],
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
    }

    openModal();
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <Container>
        {orderList.map((order: OrderState) => (
          <OrderContainer key={order.id} orderId={order.id}>
            {order.orderedProductList?.map(({ id, amount }) => {
              const { img, name, price } = productList.find(
                (product: ProductProps) => product.id === id
              );

              return (
                <OrderItemContainer key={id}>
                  <RowProductItem
                    img={img}
                    name={name}
                    price={`${numberWithCommas(price * amount)} 원 / `}
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

      <ModalPortal>
        {isModalOpen && (
          <Modal onClickClose={onClickModalClose}>
            <SuccessAddedModal
              productList={
                likedProductList.length >= 3 ? likedProductList : productList
              }
              openModal={openModal}
              onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
            />
          </Modal>
        )}
      </ModalPortal>
    </ScreenContainer>
  );
};

export default OrderListPage;
