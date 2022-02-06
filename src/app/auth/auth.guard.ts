/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Store } from '@ngrx/store'
import { map, Observable, take } from 'rxjs'
import { AppState } from '../store/app.reducer'
import { AuthService } from './auth.service'
import { userSelector } from './store/auth.selectors'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(userSelector).pipe(
      take(1),
      map((user) => {
        if (user) {
          return true
        }

        return this.router.createUrlTree(['/auth'])
      })
    )
  }
}
