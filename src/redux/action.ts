import { createAction } from 'redux-actions';
import { requestTable } from '../api/request';
import {
  CartProductDetailType,
  CartProductType,
  ProductDetailType,
  ProductType,
} from '../type';
import {
  ACTIVATE_LOADING_SPINNER,
  ADD_SHOPPING_CART_ITEMS,
  CHECK_PRODUCT,
  DEACTIVATE_LOADING_SPINNER,
  DECREASE_PRODUCT_AMOUNT,
  INCREASE_PRODUCT_AMOUNT,
  REMOVE_SHOPPING_CART_ITEMS,
  TOGGLE_LIKE_PRODUCT,
  UNCHECK_PRODUCT,
  INCREASE_PAGE_INDEX,
  DECREASE_PAGE_INDEX,
  UPDATE_PRODUCT_LIST,
  INIT_PAGE_INDEX,
} from './actionType';
import { AppDispatch } from './store';

const activateLoading = createAction(ACTIVATE_LOADING_SPINNER);
const deactivateLoading = createAction(DEACTIVATE_LOADING_SPINNER);

const increasePageIndex = createAction(INCREASE_PAGE_INDEX);
const decreasePageIndex = createAction(DECREASE_PAGE_INDEX);
const initPageIndex = createAction(INIT_PAGE_INDEX);

const increaseProductAmount = createAction(INCREASE_PRODUCT_AMOUNT);
const decreaseProductAmount = createAction(DECREASE_PRODUCT_AMOUNT);

const toggleLikeProduct = createAction(TOGGLE_LIKE_PRODUCT);

const checkProduct = createAction(CHECK_PRODUCT);
const unCheckProduct = createAction(UNCHECK_PRODUCT);

const addShoppingCartItem = createAction(ADD_SHOPPING_CART_ITEMS);
const addShoppingCartItemAsync =
  (product: ProductDetailType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());
      const { product_id }: ProductType = product;
      const response = await requestTable.POST(
        '/api/customers/zereight/carts',
        { product_id }
      );

      if (response.status !== 201) throw new Error(await response.text());

      const dbShoppingCartItemList: Array<CartProductType> =
        await requestTable.GET('/api/customers/zereight/carts');

      const targetProduct = dbShoppingCartItemList.find(
        (dbShoppingCartItem) =>
          dbShoppingCartItem.product_id === product.product_id
      );

      if (!targetProduct)
        throw new Error('서버와 동기화하는 것에 실패했습니다.');

      const newProduct: CartProductDetailType = {
        ...targetProduct,
        quantity: 1,
        checked: false,
      };

      dispatch(addShoppingCartItem(newProduct));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(deactivateLoading());
    }
  };

const removeShoppingCartItem = createAction(REMOVE_SHOPPING_CART_ITEMS);
const removeShoppingCartItemAsync =
  (product: CartProductDetailType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(activateLoading());

      const response = await requestTable.DELETE(
        `/api/customers/zereight/carts/${product.cart_id}`
      );

      if (!response.ok) throw new Error(await response.text());

      dispatch(removeShoppingCartItem(product));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(deactivateLoading());
    }
  };

const updateProductList = createAction(UPDATE_PRODUCT_LIST);
const updateProductListAsync = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(activateLoading());

    const productList = await requestTable.GET('/api/products');
    await Promise.all(
      productList.map((product: ProductType) => {
        const newProduct: ProductDetailType = {
          ...product,
          liked: false,
        };

        return dispatch(updateProductList(newProduct));
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(deactivateLoading());
  }
};

export {
  addShoppingCartItemAsync,
  removeShoppingCartItemAsync,
  activateLoading,
  deactivateLoading,
  increaseProductAmount,
  decreaseProductAmount,
  increasePageIndex,
  decreasePageIndex,
  initPageIndex,
  toggleLikeProduct,
  addShoppingCartItem,
  removeShoppingCartItem,
  checkProduct,
  unCheckProduct,
  updateProductList,
  updateProductListAsync,
};
