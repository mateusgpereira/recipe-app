import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import Recipe from '../recipe.model'

@Injectable({
  providedIn: 'root'
})
class RecipeService {
  recipesChanged = new Subject<Recipe[]>()

  private recipes: Recipe[] = []

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes
    this.recipesChanged.next(this.getRecipes())
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index]
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.getRecipes())
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe
    this.recipesChanged.next(this.getRecipes())
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.getRecipes())
  }
}

export default RecipeService
