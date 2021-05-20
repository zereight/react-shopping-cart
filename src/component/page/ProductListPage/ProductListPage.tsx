import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CONTENT_PER_PAGE, MIN_PAGE_INDEX, ROUTE } from '../../../constant';
import { useLikedProducts, useModal, useRecommendProduct } from '../../../hook';
import {
  increasePageIndex,
  increaseProductAmount,
  toggleLikeProduct,
  decreasePageIndex,
  initPageIndex,
  addShoppingCartItemAsync,
  updateProductListAsync,
} from '../../../redux/action';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductDetailType, ProductType } from '../../../type';
import Modal from '../../organism/Modal/Modal';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import ProductListLayout from '../../template/ProductListLayout/ProductListLayout';

const ProductListPage = ({ location, history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const { products, shoppingCartProducts, pageIndex } = useSelector(
    ({
      productListReducer,
      pageIndexReducer,
      myShoppingCartReducer,
    }: RootState) => ({
      products: productListReducer.products,
      shoppingCartProducts: myShoppingCartReducer.products,
      pageIndex: pageIndexReducer.pageIndex,
    })
  );

  const [showLikedProduct, setShowLikedProduct] = useState<boolean>(false);

  // TODO: 모달 부분 중복 처리해주기
  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);

  const { likedProducts } = useLikedProducts(products);
  const { recommendedProductList } = useRecommendProduct(
    products,
    likedProducts
  );

  const maxPageIndex =
    Math.ceil(
      (showLikedProduct ? Object.keys(likedProducts) : Object.keys(products))
        .length / CONTENT_PER_PAGE
    ) - 1;

  const displayProductList = (
    showLikedProduct ? Object.values(likedProducts) : Object.values(products)
  ).slice(pageIndex * CONTENT_PER_PAGE, (pageIndex + 1) * CONTENT_PER_PAGE);

  const onClickShoppingCartButton = (productId: string) => {
    if (shoppingCartProducts[productId]) {
      dispatch(increaseProductAmount(products[productId]));
    } else {
      dispatch(addShoppingCartItemAsync(products[productId]));
    }

    openModal();
  };

  const onClickLikeButton = (productId: string) => {
    dispatch(toggleLikeProduct(products[productId]));
  };

  const onClickNextPage = () => {
    dispatch(increasePageIndex({ min: MIN_PAGE_INDEX, max: maxPageIndex }));
  };

  const onClickPrevPage = () => {
    dispatch(decreasePageIndex({ min: MIN_PAGE_INDEX, max: maxPageIndex }));
  };

  const onClickShowLikedProductButton = () => {
    dispatch(initPageIndex({ min: MIN_PAGE_INDEX, max: maxPageIndex }));
    setShowLikedProduct((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(updateProductListAsync());
  }, [dispatch]);

  return (
    <ScreenContainer route={location.pathname}>
      <ProductListLayout
        onClickShowLikedProductButton={onClickShowLikedProductButton}
        showLikedProduct={showLikedProduct}
        displayProductList={displayProductList}
        likedProducts={likedProducts}
        onClickShoppingCartButton={onClickShoppingCartButton}
        onClickLikeButton={onClickLikeButton}
        onClickPrevPage={onClickPrevPage}
        pageIndex={pageIndex}
        onClickNextPage={onClickNextPage}
        maxPageIndex={maxPageIndex}
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

export default ProductListPage;
