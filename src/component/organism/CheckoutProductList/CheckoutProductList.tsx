import { CheckedItemType, ProductType } from '../../../type';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import { Container } from './CheckoutProductList.styles';

interface CheckoutProductListProps {
  productList: Array<ProductType>;
  checkedItemList: Array<CheckedItemType>;
}

const CheckoutProductList = ({
  productList,
  checkedItemList,
}: CheckoutProductListProps) => (
  <Container>
    {checkedItemList.map(({ id, amount }) => {
      const targetProduct = productList.find((product) => product.id === id);

      if (targetProduct) {
        return (
          <RowProductItem
            key={id}
            img={targetProduct.img}
            name={targetProduct.name}
            amount={`수량: ${amount} 개`}
          />
        );
      }
      return null;
    })}
  </Container>
);

export default CheckoutProductList;
export type { CheckoutProductListProps };
