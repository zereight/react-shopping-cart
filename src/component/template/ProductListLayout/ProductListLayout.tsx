import { ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import ColumnProductItem from '../../molecule/ColumnProductItem/ColumnProductItem';
import PageIndexNav from '../../molecule/PageIndexNav/PageIndexNav';
import { Container, LikedProductFilter } from './ProductListLayout.styles';

interface ProductListPageProps {
  showLikedProduct: boolean;
  maxPageIndex: number;
  pageIndex: number;
  likedProductIdList: Array<string>;
  displayProducts: Array<ProductType>;
  onClickShoppingCartIcon: (id: string) => void;
  onClickLikeButton: (id: string) => void;
  onClickShowLikedProductButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickPrevPage: React.MouseEventHandler<HTMLButtonElement>;
  onClickNextPage: React.MouseEventHandler<HTMLButtonElement>;
}

const ProductListLayout = ({
  onClickShowLikedProductButton,
  showLikedProduct,
  displayProducts,
  likedProductIdList,
  onClickShoppingCartIcon,
  onClickLikeButton,
  onClickPrevPage,
  pageIndex,
  onClickNextPage,
  maxPageIndex,
}: ProductListPageProps) => (
  <>
    <Container>
      <LikedProductFilter>
        <button type="button" onClick={onClickShowLikedProductButton}>
          {showLikedProduct ? '전체 상품 보기' : '찜한 상품만 보기'}
        </button>
      </LikedProductFilter>
      {displayProducts.length !== 0 &&
        displayProducts.map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            img={img}
            name={name}
            isLiked={likedProductIdList.includes(id)}
            price={`${numberWithCommas(price)} 원`}
            onClickShoppingCartIcon={() => onClickShoppingCartIcon(id)}
            onClickLikeButton={() => onClickLikeButton(id)}
            $buttonStyle="simple"
          />
        ))}
    </Container>

    <PageIndexNav
      onClickPrevPage={onClickPrevPage}
      pageIndex={pageIndex}
      onClickNextPage={onClickNextPage}
      maxPageIndex={maxPageIndex}
    />
  </>
);

export default ProductListLayout;
