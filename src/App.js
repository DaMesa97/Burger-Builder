import React, { Component, Suspense } from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
// import Orders from './containers/Orders/Orders'
// import Authentication from './containers/Authentication/Authentication'
import Logout from './containers/Authentication/Logout/Logout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

const Checkout = asyncComponent(() => {
   return import('./containers/Checkout/Checkout');
})
const Orders = asyncComponent(() => {
   return import('./containers/Orders/Orders');
})
const Authentication = asyncComponent(() => {
   return import('./containers/Authentication/Authentication');
})



class App extends Component {

   componentDidMount() {
      this.props.onTryAutoSignup()
   }

   render() {
      let orders = <Route path="/orders" component={Orders} />
      let checkout = <Route path="/checkout" component={Checkout} />
      if (!this.props.isAuth) {
         orders = <Redirect to='/' />;
         checkout = <Redirect to='/' />;
      }

      return (
         <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            {checkout}
            {orders}
            <Route path="/authentication" component={Authentication} />
            <Route path="/logout" component={Logout} />
         </Layout>
      );
   }

}

const mapStateToProps = state => ({
   isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
   onTryAutoSignup: () => dispatch(actions.authCheckState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
