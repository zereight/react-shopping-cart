import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ProductListPage } from './component/page';
import { GlobalNavbar } from './component/template';
import { ROUTE } from './constant';

import GlobalStyles from './style/GlobalStyles';

const App = () => {
  // const dispatch = useDispatch();
  // const loading = useSelector((state) => state.loadingReducer.loading);

  // useEffect(() => {
  //   dispatch(updateProductItemsAsync());
  //   dispatch(getMyShoppingCartAsync());
  // }, [dispatch]);

  console.log('app started');

  return (
    <>
      <GlobalStyles />
      <Router>
        <GlobalNavbar />

        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductListPage} />
          {/* <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
          <Route
            exact
            path={ROUTE.ORDER_CHECKOUT}
            component={OrderCheckoutPage}
          />
          <Route
            exact
            path={ROUTE.SHOPPING_CART}
            component={ShoppingCartPage}
          /> */}
          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Router>
      {/* {loading && (
        <ModalPortal>
          <Spinner />
        </ModalPortal>
      )} */}
    </>
  );
};

export default App;
