import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/Build Controls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spiner from '../../components/UI/Spiner/Spiner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
   salad: 0.5,
   cheese: 0.5,
   meat: 1.3,
   bacon: 1
}

class BurgerBuilder extends Component {
   state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
   }

   componentDidMount() {
      axios.get(`/ingredients.json`)
         .then(response => {
            this.setState({
               ingredients: response.data
            })
         })
         .catch(error => {
            this.setState({ error: true })
         })
   }

   updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
         .map(igKey => {
            return ingredients[igKey];
         })
         .reduce((sum, element) => {
            return sum + element;
         }, 0);
      this.setState({
         purchaseable: sum > 0
      })
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
      // alert('You continue!')
      this.setState({
         loading: true
      })
      const order = {
         ingredients: this.state.ingredients,
         price: this.state.totalPrice,
         customer: {
            name: 'Tymoteusz Weglorz',
            adress: {
               city: 'Edinburgh',
               street: 'Picardy Place 16-22',
               postCode: 'EH1 3JT',
               country: 'Scotland'
            },
            email: 'test@test.com',
         },
         deliveryMethod: 'fastest'
      }
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({ loading: false, purchasing: false })
         })
         .catch(error => {
            this.setState({ loading: false, purchasing: false })
         })
   }

   addIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredients
      })
      this.updatePurchaseState(updatedIngredients);
   }

   removeIngredientHandler = (type) => {
      const oldCount = this.state.ingredients[type];
      if (oldCount <= 0) {
         return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
         ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type]
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;

      this.setState({
         totalPrice: newPrice,
         ingredients: updatedIngredients
      })
      this.updatePurchaseState(updatedIngredients);
   }

   render() {
      const disabledInfo = {
         ...this.state.ingredients
      }
      for (let key in disabledInfo) {
         disabledInfo[key] = disabledInfo[key] <= 0
      }

      let orderSummary = null
      if (this.state.ingredients) {
         orderSummary = <OrderSummary ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
         />
      }
      if (this.state.loading) {
         orderSummary = <Spiner />
      }

      let burger = this.state.error || !this.state.ingredients ? <p>Ingredients can't be loaded!</p> : <Spiner />
      if (this.state.ingredients) {
         burger = (<Aux><Burger ingredients={this.state.ingredients} />
            <BuildControls
               ingredientAdded={this.addIngredientHandler}
               ingredientRemoved={this.removeIngredientHandler}
               disabled={disabledInfo}
               price={this.state.totalPrice}
               purchaseable={this.state.purchaseable}
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

export default withErrorHandler(BurgerBuilder, axios);