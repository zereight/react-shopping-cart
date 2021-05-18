import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ROUTE, SCHEMA } from '../../../constant';
import { useModal, useServerAPI } from '../../../hook';
import {
  increaseProductAmount,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductType } from '../../../type';
import Header from '../../atom/Header/Header';
import Modal from '../../organism/Modal/Modal';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import OrderListLayout from '../../template/OrderListLayout/OrderListLayout';

const OrderListPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();

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

  const likedProductList: Array<ProductType> = [];
  likedProductIdList.forEach((likedProductId) => {
    const targetProduct = productList.find(
      (product: ProductType) => likedProductId === product.id
    );
    if (targetProduct) likedProductList.push(targetProduct);
  });

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

      <OrderListLayout
        orderList={orderList}
        productList={productList}
        onClickShoppingCartButton={onClickShoppingCartButton}
      />

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
    </ScreenContainer>
  );
};

export default OrderListPage;
