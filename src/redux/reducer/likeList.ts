import produce from 'immer';
import { TOGGLE_LIKE_PRODUCT } from '../actionType';

interface StateProps {
  likedProductIdList: Array<string>;
}

const initState: StateProps = {
  likedProductIdList: [],
};

const likedProductIdListReducer = (
  state = initState,
  action: { type: string; productId: string }
) => {
  switch (action.type) {
    case TOGGLE_LIKE_PRODUCT: {
      const { productId } = action;
      return produce(state, (draft) => {
        if (state.likedProductIdList.includes(productId)) {
          draft.likedProductIdList = draft.likedProductIdList.filter(
            (id) => id !== productId
          );
        } else {
          draft.likedProductIdList = [...draft.likedProductIdList, productId];
        }
      });
    }

    default:
      return state;
  }
};

export default likedProductIdListReducer;
