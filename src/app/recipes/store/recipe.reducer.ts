/* eslint-disable @typescript-eslint/default-param-last */
import Recipe from '../recipe.model'
import { RecipeActions, SET_RECIPES } from './recipe.actions'

export interface RecipeState {
  recipes: Recipe[]
}

const initialState: RecipeState = {
  recipes: []
}

export const recipeReducer = (state = initialState, action: RecipeActions): RecipeState => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      }
    default:
      return state
  }
}
