import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
   state = {
      ingredients: {
         salad: 0,
         meat: 0,
         cheese: 0,
         bacon: 0
      },
      price: null
   }

   cancelClickHandler = () => {
      this.props.history.goBack()
   }

   continueClickHandler = () => {
      this.props.history.push('/checkout/contact-data')
   }

   componentDidMount() {
      if (this.props.location.state) {
         const ingredients = this.props.location.state.ingredients
         const price = this.props.location.state.price

         console.log(ingredients)

         if (ingredients) {
            this.setState({
               ingredients: ingredients,
               price: price
            })
         }
      }
   }

   render() {
      return (
         <div>
            <CheckoutSummary ingredients={this.state.ingredients}
               canceled={this.cancelClickHandler}
               continued={this.continueClickHandler}
            />
            <Route path={this.props.match.path + '/contact-data'} render={() => < ContactData ingredients={this.state.ingredients} price={this.state.price} />} />
         </div>
      )
   }
}

export default Checkout 