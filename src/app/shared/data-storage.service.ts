import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { exhaustMap, map, Observable, take, tap } from 'rxjs'
import RecipeService from '../recipes/services/recipe.service'
import { environment } from '../../environments/environment'
import Recipe from '../recipes/recipe.model'
import { AuthService } from '../auth/auth.service'

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(`${environment.firebaseUrl}/recipes.json`, {
          params: new HttpParams().set('auth', user.token)
        })
      }),
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
