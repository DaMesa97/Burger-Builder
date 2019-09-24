import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

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
      return (
         <div>
            <CheckoutSummary ingredients={this.props.ingredients}
               canceled={this.cancelClickHandler}
               continued={this.continueClickHandler}
            />
            <Route path={this.props.match.path + '/contact-data'} render={() => < ContactData ingredients={this.props.ingredients} />} />
         </div>
      )
   }
}


const mapStateToProps = (state) => ({
   ingredients: state.ingredients
})

export default connect(mapStateToProps, null)(Checkout)