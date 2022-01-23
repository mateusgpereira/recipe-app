import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Ingredient from "src/app/shared/ingredient.model";

@Injectable()
class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('apples', 3),
    new Ingredient('tomatoes', 1)
  ]

  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()

  getIngredients(): Ingredient[] {
    return this.ingredients.slice()
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index]
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.getIngredients())
  }

  addManyIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.getIngredients())
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient
    this.ingredientsChanged.next(this.getIngredients())
  }

  removeIngredient(index: number): void {
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.getIngredients())
  }
}

export default ShoppingListService
