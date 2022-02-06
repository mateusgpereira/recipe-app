import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { exhaustMap, Observable, take } from 'rxjs'
import { AppState } from '../store/app.reducer'
import { userSelector } from './store/auth.selectors'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(userSelector).pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req)
        }
        const authenticatedRequest = req.clone({
          params: new HttpParams().set('auth', user.token)
        })
        return next.handle(authenticatedRequest)
      })
    )
  }
}
