import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { environment } from 'src/environments/environment'
import Recipe from '../recipe.model'
import { FETCH_RECIPES, SetRecipes } from './recipe.actions'

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(`${environment.firebaseUrl}/recipes.json`)
    }),
    map((recipes) => {
      const sanitizedRecipes = recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ?? []
        }
      })

      return new SetRecipes(sanitizedRecipes)
    })
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
