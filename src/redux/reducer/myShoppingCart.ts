import produce from 'immer';
import {
  GET_MY_SHOPPING_CART,
  UPDATE_MY_SHOPPING_CART_ITEMS,
} from '../actionType';

interface StateProps {
  myShoppingCart: { id: string; productIdList: Array<string> };
}

const initState: StateProps = {
  myShoppingCart: { id: '', productIdList: [] },
};

const myShoppingCartReducer = (
  state = initState,
  action: {
    type: string;
    productIdList: Array<string>;
    myShoppingCart: { id: string; productIdList: Array<string> };
  }
) => {
  switch (action.type) {
    case UPDATE_MY_SHOPPING_CART_ITEMS: {
      return produce(state, (draft) => {
        draft.myShoppingCart.productIdList = action.productIdList;
      });
    }
    case GET_MY_SHOPPING_CART: {
      return produce(state, (draft) => {
        draft.myShoppingCart = action.myShoppingCart;
      });
    }
    default:
      return state;
  }
};

export default myShoppingCartReducer;
