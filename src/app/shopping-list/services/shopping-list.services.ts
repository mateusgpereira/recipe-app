import { EventEmitter, Injectable } from "@angular/core";
import Ingredient from "src/app/shared/ingredient.model";

@Injectable()
class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 3),
    new Ingredient('tomatoes', 1)
  ]

  ingredientsChanged = new EventEmitter<Ingredient[]>()

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.getIngredients())
  }

  addManyIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.getIngredients())
  }
}

export default ShoppingListService
