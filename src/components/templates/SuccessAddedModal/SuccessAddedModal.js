import React from 'react';
import PropTypes from 'prop-types';

import { numberWithCommas } from '../../../shared/utils';
import { ColumnProductItem } from '../..';
import {
  ModalText,
  ModalButton,
  RecommendedContainer,
  RecommendedTitle,
  RecommendedList,
} from './SuccessAddedModal.styles';

const SuccessAddedModal = ({ productList, openModal, onClick }) => (
  <>
    <ModalText>상품이 장바구니에 담겼습니다.</ModalText>
    <ModalButton onClick={onClick}>{'장바구니 바로가기 >'}</ModalButton>

    <RecommendedContainer>
      <RecommendedTitle>이달의 상품 TOP 3</RecommendedTitle>
      <RecommendedList>
        {productList.slice(0, 3).map(({ id, img, name, price }) => (
          <ColumnProductItem
            key={id}
            imgSrc={img}
            name={name}
            price={`${numberWithCommas(price)} 원`}
            onClick={openModal}
            isVisibleIcon={false}
          />
        ))}
      </RecommendedList>
    </RecommendedContainer>
  </>
);

SuccessAddedModal.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SuccessAddedModal;
