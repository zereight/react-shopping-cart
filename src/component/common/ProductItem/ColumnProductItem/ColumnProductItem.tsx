import {
  Container,
  Image,
  DetailContainer,
  ProductDetail,
  Name,
  Price,
} from './ColumnProductItem.styles';
import productNotFoundImg from '../../../../asset/img/empty_page.png';
import ShoppingCartIcon from '../../svg/ShoppingCartIcon/ShoppingCartIcon';

const whiteHeart = '\u2661';
const blackHeart = '\u2665';

interface ColumnProductItemProps {
  img: string;
  name: string;
  price: string;
  isVisibleIcon?: boolean;
  isLiked?: boolean;
  onClickShoppingCartIcon: () => void | undefined;
  onClickLikeButton: () => void;
}
const ColumnProductItem = ({
  img = productNotFoundImg,
  name,
  price,
  onClickShoppingCartIcon,
  isVisibleIcon,
  isLiked,
  onClickLikeButton = () => {},
}: ColumnProductItemProps) => (
  <Container>
    <Image src={img} loading="lazy" />
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </ProductDetail>

      {isVisibleIcon && (
        <>
          <button type="button" onClick={onClickLikeButton}>
            {isLiked ? blackHeart : whiteHeart}
          </button>
          <button
            data-testid="shopping-cart-icon"
            type="button"
            onClick={onClickShoppingCartIcon}
          >
            <ShoppingCartIcon scale="0.6" color="black" />
          </button>
        </>
      )}
    </DetailContainer>
  </Container>
);

ColumnProductItem.defaultProps = {
  isLiked: false,
  isVisibleIcon: true
}

export default ColumnProductItem;
