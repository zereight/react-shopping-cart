import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ROUTE } from '../../../constant';
import { useModal } from '../../../hook';
import {
  addShoppingCartItemAsync,
  increaseProductAmount,
} from '../../../redux/action';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductDetailType, ProductType } from '../../../type';
import Modal from '../../organism/Modal/Modal';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import ProductDetailLayout from '../../template/ProductDetailLayout/ProductDetailLayout';

interface MatchParams {
  id: string;
}
const ProductDetailPage = ({
  match,
  location,
  history,
}: RouteComponentProps<MatchParams>) => {
  const dispatch = useDispatch();
  const { id: productId } = match.params;

  const { products, shoppingCartProducts } = useSelector(
    ({ productListReducer, myShoppingCartReducer }: RootState) => ({
      products: productListReducer.products,
      shoppingCartProducts: myShoppingCartReducer.products,
    })
  );

  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);

  if (!products[productId]) {
    history.push({ pathname: ROUTE.HOME });
    return <></>;
  }

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

  const onClickShoppingCartButton = (id: string) => {
    if (shoppingCartProducts[id]) {
      dispatch(increaseProductAmount(products[id]));
    } else {
      dispatch(addShoppingCartItemAsync(products[id]));
    }

    openModal();
  };

  return (
    <ScreenContainer route={location.pathname}>
      <ProductDetailLayout
        product={products[productId]}
        onClickShoppingCartButton={onClickShoppingCartButton}
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

export default ProductDetailPage;
