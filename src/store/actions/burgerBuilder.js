import * as actions from './actionTypes'
import axios from '../../axios-orders';

export const addIngredient = (name) => {
   return {
      type: actions.ADD_INGREDIENT,
      ingredientName: name
   }
}

export const removeIngredient = (name) => {
   return {
      type: actions.REMOVE_INGREDIENT,
      ingredientName: name
   }
}

const setIngredients = (ingredients) => {
   return {
      type: actions.SET_INGREDIENTS,
      ingredients: ingredients
   }
}

const fetchIngredientsError = () => {
   return {
      type: actions.FETCH_INGREDIENTS_ERROR
   }
}

export const initIngredients = () => {
   return dispatch => {
      axios.get(`/ingredients.json`)
         .then(response => {
            dispatch(setIngredients(response.data))
         })
         .catch(error => {
            dispatch(fetchIngredientsError())
         })
   };
}

