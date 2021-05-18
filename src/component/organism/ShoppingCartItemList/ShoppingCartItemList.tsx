import { ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import TrashCanIcon from '../../atom/TrashIcon/TrashIcon';
import AmountCounter from '../../molecule/AmountCounter/AmountCounter';
import CheckBox from '../../molecule/CheckBox/CheckBox';
import RowProductItem from '../../molecule/RowProductItem/RowProductItem';
import {
  Container,
  ShoppingCartItemContainer,
  ShoppingCartItemOption,
  ShoppingCartItem,
} from './ShoppingCartItemList.styles';

interface ShoppingCartItemListProps {
  productList: Array<ProductType>;
  myShoppingCartProductIds: Array<string>;
  checkedProductIdList: Array<string>;
  productAmountDict: { [key: string]: number };
  onClickCheckBox: React.MouseEventHandler<HTMLInputElement>;
  onClickDeleteButton: (id: string | null) => void;
  onClickAmountCounter: (id: string, type: string) => void;
}
const ShoppingCartItemList = ({
  productAmountDict,
  productList,
  myShoppingCartProductIds,
  checkedProductIdList,
  onClickCheckBox,
  onClickDeleteButton,
  onClickAmountCounter,
}: ShoppingCartItemListProps) => (
  <Container>
    {myShoppingCartProductIds.map((productId: string) => {
      const isChecked: boolean = checkedProductIdList.includes(productId);
      const targetProduct = productList.find(({ id }) => id === productId);

      if (!targetProduct) return null;

      const { img, name, price } = targetProduct;

      const amount = productAmountDict[productId] || 1;

      return (
        <ShoppingCartItemContainer key={productId}>
          <ShoppingCartItem>
            <CheckBox
              id={productId}
              onClick={onClickCheckBox}
              isChecked={isChecked}
            />
            <RowProductItem img={img} name={name} />
          </ShoppingCartItem>

          <ShoppingCartItemOption>
            <button
              type="button"
              onClick={() => onClickDeleteButton(productId)}
            >
              <TrashCanIcon />
            </button>
            <AmountCounter
              value={amount}
              onClickUp={() => onClickAmountCounter(productId, 'up')}
              onClickDown={() => onClickAmountCounter(productId, 'down')}
            />
            <span>{`${numberWithCommas(Number(price) * amount)}원`}</span>
          </ShoppingCartItemOption>
        </ShoppingCartItemContainer>
      );
    })}
  </Container>
);

export default ShoppingCartItemList;
export type { ShoppingCartItemListProps };
