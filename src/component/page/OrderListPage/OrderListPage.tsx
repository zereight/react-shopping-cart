import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { ROUTE } from '../../../constant';
import { useModal, useServerAPI } from '../../../hook';
import {
  addShoppingCartItemAsync,
  increaseProductAmount,
} from '../../../redux/action';
import { AppDispatch, RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductDetailType, ProductType } from '../../../type';
import Header from '../../atom/Header/Header';
import Modal from '../../organism/Modal/Modal';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import OrderListLayout from '../../template/OrderListLayout/OrderListLayout';

const OrderListPage = ({ history, location }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { products, shoppingCartProducts } = useSelector(
    ({ productListReducer, myShoppingCartReducer }: RootState) => ({
      products: productListReducer.products,
      shoppingCartProducts: myShoppingCartReducer.products,
    })
  );

  const { value: orderList } = useServerAPI('/api/customers/zereight/orders');

  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);

  // TODO: 상품 목록 페이지와 중복
  const likedProducts: {
    [key: string]: ProductDetailType;
  } = {};
  Object.values(products).forEach((product) => {
    if (product.liked) {
      likedProducts[product.product_id] = product;
    }
  });

  const recommendedProductList = (
    Object.values(likedProducts).length >= 3
      ? Object.values(likedProducts)
      : Object.values(products)
  ).map(
    ({ product_id, image_url, name, price }): ProductType => ({
      product_id,
      image_url,
      name,
      price,
    })
  );

  // TODO: 상품 목록 페이지와 중복
  const onClickShoppingCartIcon = (productId: string) => {
    if (shoppingCartProducts[productId]) {
      dispatch(increaseProductAmount(products[productId]));
    } else {
      dispatch(addShoppingCartItemAsync(products[productId]));
    }

    openModal();
  };

  return (
    <ScreenContainer route={location.pathname}>
      <Header>주문 목록</Header>

      <OrderListLayout
        orderList={orderList}
        products={products}
        onClickShoppingCartButton={onClickShoppingCartIcon}
      />

      {isModalOpen && (
        <Modal onClickClose={onClickModalClose}>
          <SuccessAddedModal
            productList={recommendedProductList}
            openModal={openModal}
            onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
          />
        </Modal>
      )}
    </ScreenContainer>
  );
};

export default OrderListPage;
