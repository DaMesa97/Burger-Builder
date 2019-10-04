import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build Controls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spiner from '../../components/UI/Spiner/Spiner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
   state = {
      purchasing: false
   }

   componentDidMount() {
      this.props.onInitIngredients();
   }

   updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey];
         })
         .reduce((sum, element) => {
            return sum + element;
         }, 0);
      return sum > 0
   };

   purchaseHandler = () => {
      if (this.props.isAuth) {
         this.setState({
            purchasing: true
         })
      }
      else {
         this.props.history.push('/authentication')
      }
   }

   purchaseCancelHandler = () => {
      this.setState({
         purchasing: false
      })
   }

   purchaseContinueHandler = () => {
      if (this.props.ingredients) {
         this.props.onInitPurchase();
         this.props.history.push('/checkout')
      }
   }

   render() {
      const disabledInfo = {
         ...this.props.ingredients
      }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = null
      if (this.props.ingredients) {
         orderSummary = <OrderSummary ingredients={this.props.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.totalPrice}
         />
      }

      let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spiner />

      if (this.props.ingredients) {
         burger = (<Aux><Burger ingredients={this.props.ingredients} />
            <BuildControls
               ingredientAdded={this.props.onIngredientAdded}
               ingredientRemoved={this.props.onIngredientRemoved}
               disabled={disabledInfo}
               price={this.props.totalPrice}
               purchaseable={this.updatePurchaseState(this.props.ingredients)}
               ordered={this.purchaseHandler}
               isAuth={this.props.isAuth} />
         </Aux>)
      }
      return (
         <Aux>
            < Modal show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}>
               {orderSummary}
            </Modal>
            {burger}
         </Aux>
      );
   }
}

const mapStateToProps = (state) => ({
   ingredients: state.burgerBuilder.ingredients,
   totalPrice: state.burgerBuilder.totalPrice,
   error: state.burgerBuilder.error,
   isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit())
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));