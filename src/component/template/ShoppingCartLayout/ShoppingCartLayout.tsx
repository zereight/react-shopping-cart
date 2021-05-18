import emptyImage from '../../../asset/img/empty_page.png';
import { ProductType } from '../../../type';
import { numberWithCommas } from '../../../util';
import CheckBox from '../../molecule/CheckBox/CheckBox';
import PaymentInfoBox from '../../molecule/PaymentInfoBox/PaymentInfoBox';
import ShoppingCartItemList from '../../organism/ShoppingCartItemList/ShoppingCartItemList';
import {
  Container,
  DeleteButton,
  EmptyPageImage,
  OptionContainer,
  PaymentInfoBoxContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
} from './ShoppingCartLayout.styles';

interface ShoppingCartLayoutProps {
  productList: Array<ProductType>;
  productAmountDict: {
    [key: string]: number;
  };
  onClickCheckBox: React.MouseEventHandler<HTMLDivElement>;
  onClickAmountCounter: (id: string, type: string) => void;
  isAllChecked: boolean;
  expectedPrice: number;
  checkedProductIdList: Array<string>;
  myShoppingCartProductIds: Array<string>;
  onClickAllCheckBox: React.MouseEventHandler<HTMLDivElement>;
  onClickDeleteButton: (id: string | null) => void;
  onClickPaymentButton: React.MouseEventHandler<HTMLButtonElement>;
}
const ShoppingCartLayout = ({
  productList,
  productAmountDict,
  onClickCheckBox,
  onClickAmountCounter,
  myShoppingCartProductIds,
  onClickAllCheckBox,
  isAllChecked,
  onClickDeleteButton,
  checkedProductIdList,
  expectedPrice,
  onClickPaymentButton,
}: ShoppingCartLayoutProps) => (
  <>
    <Container>
      {myShoppingCartProductIds.length === 0 ? (
        <EmptyPageImage src={emptyImage} alt="empty page" />
      ) : (
        <>
          <ShoppingCartContainer>
            <OptionContainer>
              <CheckBox
                id="all-check"
                onClick={onClickAllCheckBox}
                isChecked={isAllChecked}
              />
              <span>모두선택</span>
              <DeleteButton
                onClick={() => onClickDeleteButton(null)}
                disabled={!checkedProductIdList.length}
              >
                상품삭제
              </DeleteButton>
            </OptionContainer>

            <ShoppingCartListTitle>{`장바구니 상품 (${myShoppingCartProductIds.length}개)`}</ShoppingCartListTitle>

            <ShoppingCartItemList
              productList={productList}
              myShoppingCartProductIds={myShoppingCartProductIds}
              checkedProductIdList={checkedProductIdList}
              productAmountDict={productAmountDict}
              onClickCheckBox={onClickCheckBox}
              onClickDeleteButton={onClickDeleteButton}
              onClickAmountCounter={onClickAmountCounter}
            />
          </ShoppingCartContainer>

          <PaymentInfoBoxContainer>
            <PaymentInfoBox
              title="결제예상금액"
              detailText="결제예상금액"
              price={`${numberWithCommas(expectedPrice)} 원`}
              buttonText={`주문하기(${checkedProductIdList.length}개)`}
              onClick={onClickPaymentButton}
              isDisable={!checkedProductIdList.length}
            />
          </PaymentInfoBoxContainer>
        </>
      )}
    </Container>
  </>
);

export default ShoppingCartLayout;
