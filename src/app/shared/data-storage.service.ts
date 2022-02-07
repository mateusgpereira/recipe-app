import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { map, Observable, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import Recipe from '../recipes/recipe.model'
import RecipeService from '../recipes/services/recipe.service'
import { SetRecipes } from '../recipes/store/recipe.actions'
import { AppState } from '../store/app.reducer'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState>
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
      tap((recipes) => this.store.dispatch(new SetRecipes(recipes)))
    )
  }
}
