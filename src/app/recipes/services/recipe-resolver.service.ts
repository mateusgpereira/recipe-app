/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router'
import { Actions, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { Observable, take } from 'rxjs'
import { AppState } from 'src/app/store/app.reducer'
import Recipe from '../recipe.model'
import { FetchRecipes, SET_RECIPES } from '../store/recipe.actions'

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private actions$: Actions, private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    this.store.dispatch(new FetchRecipes())

    return this.actions$.pipe(ofType(SET_RECIPES), take(1))
  }
}
