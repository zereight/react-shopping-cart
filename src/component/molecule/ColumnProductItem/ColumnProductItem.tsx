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
import { ItemType } from '../../../type';
import { numberWithCommas } from '../../../util';

interface ColumnProductItemProps extends ItemType {
  isIconsVisible?: boolean;
  isLiked?: boolean;
  onClickShoppingCartButton: React.MouseEventHandler<HTMLButtonElement>;
  onClickLikeButton: React.MouseEventHandler<HTMLButtonElement>;
  $buttonStyle?: ButtonType;
}

const ACTIVE = 1;
const DEACTIVE = 0.6;
const ColumnProductItem = ({
  image_url = productNotFoundImg,
  name,
  price,
  isIconsVisible = true,
  isLiked = false,
  onClickShoppingCartButton,
  onClickLikeButton,
  $buttonStyle = 'default',
}: ColumnProductItemProps) => (
  <Container>
    <Image src={image_url} loading="lazy" />
    <DetailContainer>
      <ProductDetail>
        <Name>{name}</Name>
        <Price>{`${numberWithCommas(price)} 원`}</Price>
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
          <Button
            onClick={onClickShoppingCartButton}
            $buttonStyle={$buttonStyle}
          >
            <ShoppingCartIcon scale="0.6" color="black" />
          </Button>
        </>
      )}
    </DetailContainer>
  </Container>
);

export default ColumnProductItem;
export type { ColumnProductItemProps };
