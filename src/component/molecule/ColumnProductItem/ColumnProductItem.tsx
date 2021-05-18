import {
  Container,
  Image,
  DetailContainer,
  ProductDetail,
  Name,
  Price,
} from './ColumnProductItem.styles';
import productNotFoundImg from '../../../asset/img/empty_page.png';
import ShoppingCartIcon from '../../atom/ShoppingCartIcon/ShoppingCartIcon';
import Button, { ButtonType } from '../../atom/Button/Button';

interface ColumnProductItemProps {
  img: string;
  name: string;
  price: string;
  isIconsVisible?: boolean;
  isLiked?: boolean;
  onClickShoppingCartIcon: React.MouseEventHandler<HTMLButtonElement>;
  onClickLikeButton: React.MouseEventHandler<HTMLButtonElement>;
  $buttonStyle?: ButtonType;
}

const ACTIVE = 1;
const DEACTIVE = 0.6;
const ColumnProductItem = ({
  img = productNotFoundImg,
  name,
  price,
  isIconsVisible = true,
  isLiked = false,
  onClickShoppingCartIcon,
  onClickLikeButton,
  $buttonStyle = 'default',
}: ColumnProductItemProps) => (
  <Container>
    <Image src={img} loading="lazy" />
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </ProductDetail>
      {isIconsVisible && (
        <>
          <Button
            onClick={onClickLikeButton}
            $opacity={isLiked ? ACTIVE : DEACTIVE}
            $buttonStyle={$buttonStyle}
          >
            ❤️
          </Button>
          <Button onClick={onClickShoppingCartIcon} $buttonStyle={$buttonStyle}>
            <ShoppingCartIcon scale="0.6" color="black" />
          </Button>
        </>
      )}
    </DetailContainer>
  </Container>
);

export default ColumnProductItem;
export type { ColumnProductItemProps };
