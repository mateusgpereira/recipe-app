import { EventEmitter, Injectable } from "@angular/core";
import Recipe from "../recipe.model";

@Injectable()
class RecipeService {

  recipeSelected = new EventEmitter<Recipe>()

  private recipes: Recipe[] = [
    new Recipe(
      'recipe one',
      'first veggie recipe',
      'https://www.eatwell101.com/wp-content/uploads/2017/05/Sausage-and-Veggies-One-Pot-1-800x800.jpg'
    ),
    new Recipe(
      'Recipe Two',
      'Second veggie recipe',
      'https://www.eatwell101.com/wp-content/uploads/2017/05/Sausage-and-Veggies-One-Pot-1-800x800.jpg'
    )
  ]

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

}

export default RecipeService
