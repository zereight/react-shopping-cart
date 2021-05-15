import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Spinner } from './component';
import {
  OrderCheckoutPage,
  OrderListPage,
  ProductListPage,
  ShoppingCartPage,
} from './component/page';
import { GlobalNavbar } from './component/template';
import { ROUTE } from './constant';
import { ModalPortal } from './portal';
import {
  getMyShoppingCartAsync,
  updateProductItemsAsync,
} from './redux/action';
import { RootState } from './redux/store';

import GlobalStyles from './style/GlobalStyles';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(
    ({ loadingReducer }: RootState) => loadingReducer.loading
  );

  useEffect(() => {
    dispatch(updateProductItemsAsync());
    dispatch(getMyShoppingCartAsync());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Router>
        <GlobalNavbar />

        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductListPage} />
          <Route
            exact
            path={ROUTE.SHOPPING_CART}
            component={ShoppingCartPage}
          />
          <Route
            exact
            path={ROUTE.ORDER_CHECKOUT}
            component={OrderCheckoutPage}
          />
          <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Router>
      {loading && (
        <ModalPortal>
          <Spinner />
        </ModalPortal>
      )}
    </>
  );
};

export default App;
