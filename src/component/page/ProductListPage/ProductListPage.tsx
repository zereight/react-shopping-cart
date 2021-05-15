import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  PageButtonContainer,
  PageIndex,
  LikedProductFilter,
} from './ProductListPage.styles';
import { RootState } from '../../../redux/store';
import { CONTENT_PER_PAGE, ROUTE } from '../../../constant';
import { useModal } from '../../../hook';
import {
  increaseProductAmount,
  toggleLikedProductList,
  updatePageIndex,
  updateShoppingCartItemsAsync,
} from '../../../redux/action';
import ScreenContainer from '../../../style/ScreenContainer';
import ColumnProductItem from '../../common/ProductItem/ColumnProductItem/ColumnProductItem';
import { numberWithCommas } from '../../../util';
import { ModalPortal } from '../../../portal';
import { Modal } from '../..';
import { SuccessAddedModal } from '../../template';
import Button from '../../common/Button/Button';
import { ProductProps } from '../../../type';

const ProductListPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const [showLikedProduct, setShowLikedProduct] = useState(false);

  const { open: openModal, onClickClose: onClickModalClose } = useModal(false);

  const likedProductList = likedProductIdList.map((likedProductId) =>
    productList.find((product: { id: string }) => likedProductId === product.id)
  );

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
        productIdList: [...new Set([...myShoppingCartProductIds, productId])],
      };
      dispatch(updateShoppingCartItemsAsync(myShoppingCartId, newContent));
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
      <Container>
        <LikedProductFilter>
          <button type="button" onClick={onClickShowLikedProductButton}>
            {showLikedProduct ? '전체 상품 보기' : '찜한 상품만 보기'}
          </button>
        </LikedProductFilter>
        {displayProducts.length === 0
          ? 'No results.'
          : displayProducts.map(
              ({
                id,
                img,
                name,
                price,
              }: ProductProps) => (
                <ColumnProductItem
                  key={id}
                  img={img}
                  name={name}
                  isLiked={likedProductIdList.includes(id)}
                  price={`${numberWithCommas(price)} 원`}
                  onClickShoppingCartIcon={() => onClickShoppingCartIcon(id)}
                  onClickLikeButton={() => onClickLikeButton(id)}
                />
              )
            )}
      </Container>

      <ModalPortal>
        <Modal onClickClose={onClickModalClose}>
          <SuccessAddedModal
            productList={
              likedProductList.length >= 3 ? likedProductList : productList
            }
            openModal={openModal}
            onClick={() => history.push({ pathname: ROUTE.SHOPPING_CART })}
          />
        </Modal>
      </ModalPortal>
      <PageButtonContainer>
        <Button onClick={onClickPrevPage} disabled={pageIndex === 0}>
          이전
        </Button>
        <PageIndex>{pageIndex + 1}</PageIndex>
        <Button onClick={onClickNextPage} disabled={pageIndex === maxPageIndex}>
          다음
        </Button>
      </PageButtonContainer>
    </ScreenContainer>
  );
};

export default ProductListPage;
