/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, of, switchMap, take } from 'rxjs'
import { AppState } from 'src/app/store/app.reducer'
import Recipe from '../recipe.model'
import { FetchRecipes, SET_RECIPES } from '../store/recipe.actions'
import { recipesSelector } from '../store/recipe.selectors'

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    return this.store.select(recipesSelector).pipe(
      take(1),
      switchMap((recipes) => {
        if (recipes.length > 0) {
          return of(recipes)
        }

        this.store.dispatch(new FetchRecipes())
        return this.actions$.pipe(ofType(SET_RECIPES), take(1))
      })
    )
  }
}
