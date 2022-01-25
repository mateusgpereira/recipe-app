import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import RecipeService from '../recipes/services/recipe.service'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes()
    this.http
      .put('https://ng-demo-d381d-default-rtdb.firebaseio.com/', recipes)
      .subscribe((res) => console.log(res))
  }
}
