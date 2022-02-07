/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth.service'
import { createUser } from '../helpers/create-user.helper'
import { AuthResponseData, UserData } from '../helpers/types'
import { User } from '../user.model'
import {
  AUTO_LOGIN,
  LOGIN,
  Login,
  LoginFail,
  LoginStart,
  LOGIN_START,
  LOGOUT,
  SignupStart,
  SIGNUP_START
} from './auth.actions'

const handleErrorcode = (errorCode: string): string => {
  switch (errorCode) {
    case 'EMAIL_EXISTS':
      return 'This email exists already.'
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      return 'Invalid crendentials.'
    default:
      return 'An unkown error has occurred.'
  }
}

const handleError = (errorResponse: HttpErrorResponse): string => {
  const errorCode = errorResponse.error?.error?.message ?? ''
  return handleErrorcode(errorCode)
}

const handleAuthenticationFail = (errorRes: any): Observable<LoginFail> => {
  const errorMessage = handleError(errorRes)
  return of(new LoginFail(errorMessage))
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      const { email, password } = authData.payload
      return this.http
        .post<AuthResponseData>(
          `${environment.authBaseUrl}/accounts:signInWithPassword?key=${environment.apiKey}`,
          {
            email,
            password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(this.handleAuthenticationSuccessful.bind(this)),
          catchError(handleAuthenticationFail)
        )
    })
  )

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(LOGIN),
    tap((authLoginAction: Login) => {
      if (authLoginAction.payload.redirect) {
        this.router.navigate(['/'])
      }
    })
  )

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap((signUpAction: SignupStart) => {
      const { email, password } = signUpAction.payload
      return this.http
        .post<AuthResponseData>(
          `${environment.authBaseUrl}/accounts:signUp?key=${environment.apiKey}`,
          {
            email,
            password,
            returnSecureToken: true
          }
        )
        .pipe(
          map(this.handleAuthenticationSuccessful.bind(this)),
          catchError(handleAuthenticationFail)
        )
    })
  )

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData')
      this.router.navigate([])
    })
  )

  @Effect()
  authAutoLogin = this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      const userData: UserData = JSON.parse(localStorage.getItem('userData'))
      if (!userData) {
        return { type: 'NONE' }
      }

      const tokenExpirationDate = new Date(userData._tokenExpirationDate)
      const user = new User(userData.email, userData.localId, userData._token, tokenExpirationDate)

      if (user.token) {
        const expiresIn = tokenExpirationDate.getTime() - Date.now()
        this.authService.setLogoutTimer(expiresIn)
        return new Login({ user, redirect: false })
      }

      return { type: 'NONE' }
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  private handleAuthenticationSuccessful(resData: AuthResponseData): Login {
    const user = createUser(resData)
    localStorage.setItem('userData', JSON.stringify(user))
    this.authService.setLogoutTimer(+resData.expiresIn * 1000)
    return new Login({ user, redirect: true })
  }
}
