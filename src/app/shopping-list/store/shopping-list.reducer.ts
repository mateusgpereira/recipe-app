/* eslint-disable @typescript-eslint/default-param-last */
import Ingredient from '../../shared/ingredient.model'
import { ShoppingListState } from '../types'
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UpdateIngredient,
  UPDATE_INGREDIENT
} from './shopping-list.action'

const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
}

const updateIngredientReducer = (
  state: ShoppingListState,
  action: UpdateIngredient
): ShoppingListState => {
  const index = state.editedIngredientIndex
  const ingredient = state.ingredients[index]
  const updatedIngredient = { ...ingredient, ...action.payload }

  const ingredients = [...state.ingredients]
  ingredients[index] = updatedIngredient

  return {
    ...state,
    ingredients,
    editedIngredient: null,
    editedIngredientIndex: -1
  }
}

export const shoppingListReducer = (
  state = initialState,
  action: ShoppingListActions
): ShoppingListState => {
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
        ingredients: state.ingredients.filter(
          (ingredient, index) => index !== state.editedIngredientIndex
        ),
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      }
    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state
  }
}
