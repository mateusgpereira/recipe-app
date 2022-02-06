import Ingredient from '../shared/ingredient.model'

export interface ShoppingListState {
  ingredients: Ingredient[]
  editedIngredient: Ingredient
  editedIngredientIndex: number
}
