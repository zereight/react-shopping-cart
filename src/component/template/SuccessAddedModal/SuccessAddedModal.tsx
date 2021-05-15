import React from 'react';
import { ColumnProductItem } from '../..';
import { numberWithCommas } from '../../../util';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedModal.styles';

interface SuccessAddedModalProps {
  productList: {
    id: string;
    name: string;
    img: string;
    price: string;
  }[];
  openModal: () => void;
  onClick: () => void;
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
        {productList.slice(0, 3).map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            img={img}
            name={name}
            price={`${numberWithCommas(Number(price))} 원`}
            onClickShoppingCartIcon={openModal}
            isVisibleIcon={false}
            onClickLikeButton={()=>{}}
          />
        ))}
      </RecommendedList>
    </RecommendedContainer>
  </>
);


export default SuccessAddedModal;
