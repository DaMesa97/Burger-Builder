import * as actions from './actionTypes'

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