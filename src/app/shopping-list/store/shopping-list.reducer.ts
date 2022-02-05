/* eslint-disable @typescript-eslint/default-param-last */
import Ingredient from '../../shared/ingredient.model'
import { ShoppingListState } from '../types'
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  UpdateIngredient,
  UPDATE_INGREDIENT
} from './shopping-list.action'

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
}

const updateIngredientReducer = (
  state: ShoppingListState,
  action: UpdateIngredient
): ShoppingListState => {
  const { index } = action.payload
  const ingredient = state.ingredients[index]
  const updatedIngredient = { ...ingredient, ...action.payload.ingredient }

  const ingredients = [...state.ingredients]
  ingredients[index] = updatedIngredient

  return {
    ...state,
    ingredients
  }
}

const shoppingListReducer = (state = initialState, action: ShoppingListActions) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case UPDATE_INGREDIENT:
      return updateIngredientReducer(state, action)
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, index) => index !== action.payload)
      }
    default:
      return state
  }
}

export { shoppingListReducer }
