import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { map, switchMap, withLatestFrom } from 'rxjs'
import { AppState } from 'src/app/store/app.reducer'
import { environment } from 'src/environments/environment'
import Recipe from '../recipe.model'
import { FETCH_RECIPES, SetRecipes, STORE_RECIPES } from './recipe.actions'
import { recipesSelector } from './recipe.selectors'

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

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(STORE_RECIPES),
    withLatestFrom(this.store.select(recipesSelector)),
    switchMap(([_, recipes]) => {
      return this.http.put(`${environment.firebaseUrl}/recipes.json`, recipes)
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}
}
