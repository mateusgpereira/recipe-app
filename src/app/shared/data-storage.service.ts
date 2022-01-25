import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import RecipeService from '../recipes/services/recipe.service'
import { environment } from '../../environments/environment'
import Recipe from '../recipes/recipe.model'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes()
    this.http
      .put(`${environment.firebaseUri}/recipes.json`, recipes)
      .subscribe((res) => console.log(res))
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(`${environment.firebaseUri}/recipes.json`)
      .subscribe((recipes) => this.recipeService.setRecipes(recipes))
  }
}
