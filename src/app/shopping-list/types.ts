import Ingredient from '../shared/ingredient.model'

export interface ShoppingListStore {
  shoppingList: ShoppingListState
}

export interface ShoppingListState {
  ingredients: Ingredient[]
}
