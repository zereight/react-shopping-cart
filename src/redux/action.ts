import { requestTable } from '../api/request';
import { CUSTOMER_ID, SCHEMA } from '../constant';

import {
  ACTIVATE_LOADING_SPINNER,
  DEACTIVATE_LOADING_SPINNER,
  DECREASE_PRODUCT_AMOUNT,
  GET_MY_SHOPPING_CART,
  INCREASE_PRODUCT_AMOUNT,
  TOGGLE_LIKE_PRODUCT,
  UPDATE_CHECKED_PRODUCT_ITEMS,
  UPDATE_MY_SHOPPING_CART_ITEMS,
  UPDATE_PAGE_INDEX,
  UPDATE_PRODUCT_AMOUNT_LIST,
  UPDATE_PRODUCT_ITEMS,
} from './actionType';
import { AppDispatch } from './store';

const activateLoading = () => ({
  type: ACTIVATE_LOADING_SPINNER,
});

const deactivateLoading = () => ({
  type: DEACTIVATE_LOADING_SPINNER,
});

const increaseProductAmount = (productId: string) => ({
  type: INCREASE_PRODUCT_AMOUNT,
  productId,
});

const decreaseProductAmount = (productId: string) => ({
  type: DECREASE_PRODUCT_AMOUNT,
  productId,
});

const updateProductAmount = (productId: string) => ({
  type: UPDATE_PRODUCT_AMOUNT_LIST,
  productId,
});

const updateCheckedProductItems = (productItems: Array<string>) => ({
  type: UPDATE_CHECKED_PRODUCT_ITEMS,
  productItems,
});

const updateProductItemsAsync = (): any => async (dispatch: AppDispatch) => {
  try {
    dispatch(activateLoading());
    const productItems = await requestTable.GET(SCHEMA.PRODUCT);

    dispatch({
      type: UPDATE_PRODUCT_ITEMS,
      productItems,
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(deactivateLoading());
  }
};

const updateShoppingCartItemsAsync =
  (
    targetId: string | undefined,
    content: { productIdList: Array<string> }
  ): any =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());
      await requestTable.PUT(SCHEMA.SHOPPING_CART, targetId, content);

      dispatch({
        type: UPDATE_MY_SHOPPING_CART_ITEMS,
        productIdList: content.productIdList,
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(deactivateLoading());
    }
  };

const getMyShoppingCartAsync = (): any => async (dispatch: AppDispatch) => {
  try {
    dispatch(activateLoading());
    const shoppingCartList =
      (await requestTable.GET(SCHEMA.SHOPPING_CART)) || [];

    dispatch({
      type: GET_MY_SHOPPING_CART,
      myShoppingCart: shoppingCartList[CUSTOMER_ID],
    });
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(deactivateLoading());
  }
};

const updatePageIndex = (pageIndex: number) => ({
  type: UPDATE_PAGE_INDEX,
  pageIndex,
});

const toggleLikedProductList = (productId: string) => ({
  type: TOGGLE_LIKE_PRODUCT,
  productId,
});

export {
  activateLoading,
  deactivateLoading,
  updateCheckedProductItems,
  increaseProductAmount,
  decreaseProductAmount,
  updateProductAmount,
  updateShoppingCartItemsAsync,
  getMyShoppingCartAsync,
  updateProductItemsAsync,
  updatePageIndex,
  toggleLikedProductList,
};