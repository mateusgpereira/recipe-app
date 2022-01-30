import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { AuthService } from '../auth/auth.service'
import Recipe from '../recipes/recipe.model'
import RecipeService from '../recipes/services/recipe.service'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes()
    this.http
      .put(`${environment.firebaseUrl}/recipes.json`, recipes)
      .subscribe((res) => console.log(res))
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.firebaseUrl}/recipes.json`).pipe(
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
