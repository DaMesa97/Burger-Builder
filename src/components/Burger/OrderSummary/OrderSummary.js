import React, { Component } from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
   render() {
      const ingredientSummary = Object.keys(this.props.ingredients)
         .map(igKey => {
            return <li key={igKey}><span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
         })
      return (
         <Aux>
            <h3>Your order</h3>
            <p>Delicious burger with: </p>
            <ul>
               {ingredientSummary}
            </ul>
            <h3>Your total: {Math.floor(this.props.price * 100) / 100}$</h3>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>Continue</Button>
         </Aux >
      );
   }
}

export default OrderSummary