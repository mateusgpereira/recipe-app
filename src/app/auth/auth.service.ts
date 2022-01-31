/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { User } from './user.model'

export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

interface UserData {
  email: string
  localId: string
  _token: string
  _tokenExpirationDate: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  private expirationTimer: any

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
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
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }, catchError(this.handleError.bind(this)))
      )
  }

  login(email: string, password: string): Observable<AuthResponseData> {
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
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logout(): void {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer)
    }
    this.expirationTimer = null
  }

  autoLogin(): void {
    const userData: UserData = JSON.parse(localStorage.getItem('userData'))
    if (!userData) {
      return
    }

    const tokenExpirationDate = new Date(userData._tokenExpirationDate)
    const user = new User(userData.email, userData.localId, userData._token, tokenExpirationDate)

    if (user.token) {
      this.user.next(user)
      this.autoLogout(tokenExpirationDate.getTime() - new Date().getTime())
    }
  }

  autoLogout(expirationDurationInMs: number): void {
    this.expirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDurationInMs)
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    const errorCode = errorResponse.error?.error?.message ?? ''
    const errorMessage = this.handleErrorcode(errorCode)
    return throwError(errorMessage)
  }

  private handleErrorcode(errorCode: string): string {
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

  private handleAuthentication(
    email: string,
    userId: string,
    idToken: string,
    expiresIn: number
  ): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, idToken, expirationDate)
    this.user.next(user)
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(user))
  }
}
