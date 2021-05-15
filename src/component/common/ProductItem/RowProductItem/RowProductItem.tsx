import {
  Container,
  Image,
  ProductContainer,
  ProductDetail,
  Name,
} from './RowProductItem.styles';

interface RowProductItemProps {
  img?: string;
  name: string;
  price?: string;
  amount?: string;
}
const RowProductItem = ({ img, name, price, amount }: RowProductItemProps) => (
  <Container>
    <Image src={img} />
    <ProductContainer>
      <Name>{name}</Name>
      <ProductDetail>
        {price && <span>{price}</span>}
        {amount && <span>{amount}</span>}
      </ProductDetail>
    </ProductContainer>
  </Container>
);

RowProductItem.defaultProps = {
  img: 'https://lh3.googleusercontent.com/proxy/1c4QW5NSZSE7GWkRDMJC-0fBKuXA0rOGWy3b7orSCWSui-lGrgG7yx03uivU67j0Rm2bWAdF46VvqAnW2mFJ3n-EQDu1fr7XzQey',
  price: '',
  amount: '',
};

export default RowProductItem;
