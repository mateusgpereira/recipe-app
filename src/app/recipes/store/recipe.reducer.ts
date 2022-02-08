/* eslint-disable @typescript-eslint/default-param-last */
import Recipe from '../recipe.model'
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  RecipeActions,
  SET_RECIPES,
  UpdateRecipe,
  UPDATE_RECIPE
} from './recipe.actions'

export interface RecipeState {
  recipes: Recipe[]
}

const initialState: RecipeState = {
  recipes: []
}

const updateRecipe = (state = initialState, action: UpdateRecipe): RecipeState => {
  const recipes = [...state.recipes]
  recipes[action.payload.index] = action.payload.recipe
  return {
    ...state,
    recipes
  }
}

export const recipeReducer = (state = initialState, action: RecipeActions): RecipeState => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    case UPDATE_RECIPE:
      return updateRecipe(state, action)
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index !== action.payload)
      }
    default:
      return state
  }
}
