import { ProductType } from '../../type';
import { UPDATE_PRODUCT_ITEMS } from '../actionType';

interface StateType {
  productList: Array<ProductType>;
}

const initState: StateType = {
  productList: [],
};

const productListReducer = (
  state = initState,
  action: { type: string; productItems: Array<ProductType> }
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_ITEMS: {
      return { ...state, productList: action.productItems };
    }

    default:
      return state;
  }
};

export default productListReducer;
