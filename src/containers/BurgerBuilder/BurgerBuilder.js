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
      purchasing: false,
      loading: false,
      error: false
   }

   // componentDidMount() {
   //    axios.get(`/ingredients.json`)
   //       .then(response => {
   //          this.setState({
   //             ingredients: response.data
   //          })
   //       })
   //       .catch(error => {
   //          this.setState({ error: true })
   //       })
   //    console.log(this.props)
   // }

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
      this.setState({
         purchasing: true
      })
   }

   purchaseCancelHandler = () => {
      this.setState({
         purchasing: false
      })
   }

   purchaseContinueHandler = () => {
      if (this.props.ingredients) {
         this.props.history.push('/checkout')
      }
   }

   // addIngredientHandler = (type) => {
   //    const oldCount = this.state.ingredients[type];
   //    const updatedCount = oldCount + 1;
   //    const updatedIngredients = {
   //       ...this.state.ingredients
   //    };
   //    updatedIngredients[type] = updatedCount;
   //    const priceAddition = INGREDIENT_PRICES[type]
   //    const oldPrice = this.state.totalPrice;
   //    const newPrice = oldPrice + priceAddition;

   //    this.setState({
   //       totalPrice: newPrice,
   //       ingredients: updatedIngredients
   //    })
   //    this.updatePurchaseState(updatedIngredients);
   // }

   // removeIngredientHandler = (type) => {
   //    const oldCount = this.state.ingredients[type];
   //    if (oldCount <= 0) {
   //       return;
   //    }
   //    const updatedCount = oldCount - 1;
   //    const updatedIngredients = {
   //       ...this.state.ingredients
   //    };
   //    updatedIngredients[type] = updatedCount;
   //    const priceDeduction = INGREDIENT_PRICES[type]
   //    const oldPrice = this.state.totalPrice;
   //    const newPrice = oldPrice - priceDeduction;

   //    this.setState({
   //       totalPrice: newPrice,
   //       ingredients: updatedIngredients
   //    })
   //    this.updatePurchaseState(updatedIngredients);
   // }

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
      if (this.state.loading) {
         orderSummary = <Spiner />
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
               ordered={this.purchaseHandler} />
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
   ingredients: state.ingredients,
   totalPrice: state.totalPrice
})

const mapDispatchToProps = dispatch => {
   return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName))
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));