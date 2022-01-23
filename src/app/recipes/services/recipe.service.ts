import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import Ingredient from "src/app/shared/ingredient.model";
import Recipe from "../recipe.model";

@Injectable()
class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice()
  }

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index]
  }

}

export default RecipeService
