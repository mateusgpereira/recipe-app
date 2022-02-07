import { ActionReducerMap } from '@ngrx/store'
import { authReducer, AuthState } from '../auth/store/auth.reducer'
import { recipeReducer, RecipeState } from '../recipes/store/recipe.reducer'
import { shoppingListReducer } from '../shopping-list/store/shopping-list.reducer'
import { ShoppingListState } from '../shopping-list/types'

export interface AppState {
  shoppingList: ShoppingListState
  auth: AuthState
  recipe: RecipeState
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipe: recipeReducer
}
