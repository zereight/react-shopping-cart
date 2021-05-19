import { ProductType } from '../../../type';
import ColumnProductItem from '../../molecule/ColumnProductItem/ColumnProductItem';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedModal.styles';

interface SuccessAddedModalProps {
  productList: Array<ProductType>;
  openModal: React.MouseEventHandler<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const SuccessAddedModal = ({
  productList,
  openModal,
  onClick,
}: SuccessAddedModalProps) => (
  <>
    <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
    <ModalButton onClick={onClick}>{'장바구니 바로가기 >'}</ModalButton>

    <RecommendedContainer>
      <RecommendedTitle>❤️ 잠깐! 아래 상품들도 살펴보세요! ❤️</RecommendedTitle>
      <RecommendedList>
        {productList
          .slice(0, 3)
          .map(({ product_id, image_url, name, price }) => (
            <ColumnProductItem
              key={product_id}
              image_url={image_url}
              name={name}
              price={price}
              onClickShoppingCartButton={openModal}
              isIconsVisible={false}
              onClickLikeButton={() => {}}
            />
          ))}
      </RecommendedList>
    </RecommendedContainer>
  </>
);

export default SuccessAddedModal;
export type { SuccessAddedModalProps };
