import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Logout from './Containers/Auth/Logout/Logout';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));
const Order = React.lazy(() => import('./Containers/Orders/Orders'));
const Auth = React.lazy(() => import('./Containers/Auth/Auth'));

const app = (props) => {
  const { ontryAutoSignup } = props;

  useEffect(() => {
    ontryAutoSignup();
  }, [ontryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props}/>} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" render={(props) => <Order {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props}/>} />
        <Route path="/" exact component={BurgerBuilder} />
        {/* <Redirect to="/" /> */}
      </Switch>);
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    ontryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(app));
