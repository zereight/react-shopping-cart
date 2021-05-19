import { ItemType } from '../../../type';
import { numberWithCommas } from '../../../util';
import {
  Container,
  Image,
  ProductContainer,
  ProductDetail,
  Name,
} from './RowProductItem.styles';

interface RowProductItemProps extends Partial<ItemType> {
  quantity?: number;
}
const RowProductItem = ({
  image_url = 'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  name = '',
  price,
  quantity,
}: RowProductItemProps) => (
  <Container>
    <Image src={image_url} />
    <ProductContainer>
      <Name>{name}</Name>
      <ProductDetail>
        {price && <span>{`${numberWithCommas(price)} 원 / `}</span>}
        {quantity && <span>{`수량: ${quantity} 개`}</span>}
      </ProductDetail>
    </ProductContainer>
  </Container>
);

export default RowProductItem;
export type { RowProductItemProps };
