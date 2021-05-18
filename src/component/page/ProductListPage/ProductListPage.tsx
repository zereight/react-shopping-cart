import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { CONTENT_PER_PAGE, ROUTE } from '../../../constant';
import { useModal } from '../../../hook';
import {
  increaseProductAmount,
  toggleLikedProductList,
  updatePageIndex,
  updateProductAmount,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import { RootState } from '../../../redux/store';
import ScreenContainer from '../../../style/ScreenContainer';
import { ProductType } from '../../../type';
import Modal from '../../organism/Modal/Modal';
import SuccessAddedModal from '../../organism/SuccessAddedModal/SuccessAddedModal';
import ProductListLayout from '../../template/ProductListLayout/ProductListLayout';

const ProductListPage = ({ location, history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const {
    myShoppingCartId,
    myShoppingCartProductIds,
    pageIndex,
    productList,
    likedProductIdList,
  } = useSelector(
    ({
      myShoppingCartReducer,
      pageIndexReducer,
      productListReducer,
      likedProductIdListReducer,
    }: RootState) => ({
      myShoppingCartId: myShoppingCartReducer.myShoppingCart.id,
      myShoppingCartProductIds:
        myShoppingCartReducer.myShoppingCart.productIdList,
      pageIndex: pageIndexReducer.pageIndex,
      productList: productListReducer.productList,
      likedProductIdList: likedProductIdListReducer.likedProductIdList,
    })
  );

  const [showLikedProduct, setShowLikedProduct] = useState<boolean>(false);

  const {
    isModalOpen,
    open: openModal,
    onClickClose: onClickModalClose,
  } = useModal(false);

  const likedProductList: Array<ProductType> = [];
  likedProductIdList.forEach((likedProductId) => {
    const targetProduct = productList.find(
      (product: { id: string }) => likedProductId === product.id
    );

    if (targetProduct) likedProductList.push(targetProduct);
  });

  const maxPageIndex =
    Math.ceil(
      (showLikedProduct ? likedProductList : productList).length /
        CONTENT_PER_PAGE
    ) - 1;

  const displayProducts = (
    showLikedProduct ? likedProductList : productList
  ).slice(pageIndex * CONTENT_PER_PAGE, (pageIndex + 1) * CONTENT_PER_PAGE);

  const onClickShoppingCartIcon = (productId: string) => {
    if (myShoppingCartProductIds.includes(productId)) {
      dispatch(increaseProductAmount(productId));
    } else {
      const newContent = {
        productIdList: [...myShoppingCartProductIds, productId],
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent)).then(
        () => {
          dispatch(updateProductAmount(productId));
        }
      );
    }

    openModal();
  };

  const onClickLikeButton = (productId: any) => {
    dispatch(toggleLikedProductList(productId));
  };

  const onClickNextPage = () => {
    const newPageIndex =
      pageIndex + 1 <= maxPageIndex ? pageIndex + 1 : pageIndex;
    dispatch(updatePageIndex(newPageIndex));
  };

  const onClickPrevPage = () => {
    const newPageIndex = pageIndex < 1 ? 0 : pageIndex - 1;
    dispatch(updatePageIndex(newPageIndex));
  };

  const onClickShowLikedProductButton = () => {
    dispatch(updatePageIndex(0));
    setShowLikedProduct((prevState) => !prevState);
  };

  return (
    <ScreenContainer route={location.pathname}>
      <ProductListLayout
        onClickShowLikedProductButton={onClickShowLikedProductButton}
        showLikedProduct={showLikedProduct}
        displayProducts={displayProducts}
        likedProductIdList={likedProductIdList}
        onClickShoppingCartIcon={onClickShoppingCartIcon}
        onClickLikeButton={onClickLikeButton}
        onClickPrevPage={onClickPrevPage}
        pageIndex={pageIndex}
        onClickNextPage={onClickNextPage}
        maxPageIndex={maxPageIndex}
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

export default ProductListPage;
