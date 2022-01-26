import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
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

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.firebaseUri}/recipes.json`).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ?? []
          }
        })
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    )
  }
}
