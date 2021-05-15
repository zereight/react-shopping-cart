import produce from 'immer';
import { AMOUNT_COUNT } from '../../constant';

import {
  DECREASE_PRODUCT_AMOUNT,
  INCREASE_PRODUCT_AMOUNT,
  UPDATE_PRODUCT_AMOUNT_LIST,
} from '../actionType';

interface StateProps {
  productAmountDict: any;
}

const initState: StateProps = {
  productAmountDict: {},
};

const productAmountDictReducer = (
  state = initState,
  action: { type: string; productId: string }
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_AMOUNT_LIST: {
      return produce(state, (draft) => {
        if (!draft.productAmountDict[action.productId]) {
          draft.productAmountDict[action.productId] = 1;
        } else {
          delete draft.productAmountDict[action.productId];
        }
      });
    }
    case INCREASE_PRODUCT_AMOUNT: {
      return produce(state, (draft) => {
        draft.productAmountDict[action.productId] +=
          draft.productAmountDict[action.productId] < AMOUNT_COUNT.MAX ? 1 : 0;
      });
    }
    case DECREASE_PRODUCT_AMOUNT: {
      return produce(state, (draft) => {
        draft.productAmountDict[action.productId] -=
          draft.productAmountDict[action.productId] > AMOUNT_COUNT.MIN ? 1 : 0;
      });
    }
    default:
      return state;
  }
};

export default productAmountDictReducer;
