import React from 'react';
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'

import { Route } from 'react-router-dom'

function App() {
   return (
      <Layout>
         <Route path="/" exact component={BurgerBuilder} />
         <Route path="/checkout" component={Checkout} />
      </Layout>
   );
}

export default App;
