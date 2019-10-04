import React, { Component, Suspense } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {

   cancelClickHandler = () => {
      this.props.history.goBack()
   }

   continueClickHandler = () => {
      this.props.history.push('/checkout/contact-data')
   }

   render() {
      let summary = <Redirect to="/" />
      if (this.props.ingredients) {
         let purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
         summary = (
            <div>
               {purchasedRedirect}
               <CheckoutSummary ingredients={this.props.ingredients}
                  canceled={this.cancelClickHandler}
                  continued={this.continueClickHandler}
               />
               <Route path={this.props.match.path + '/contact-data'} render={() => < ContactData ingredients={this.props.ingredients} />} />
            </div>
         )
      }
      return (
         summary
      )
   }
}


const mapStateToProps = (state) => ({
   ingredients: state.burgerBuilder.ingredients,
   purchased: state.orders.purchased
})

export default connect(mapStateToProps)(Checkout)