import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
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

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient) {}

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

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    const errorCode = errorResponse.error?.error?.message ?? ''
    const errorMessage = this.handleErrorcode(errorCode)
    return throwError(errorMessage)
  }

  private handleErrorcode(errorCode: string): string {
    switch (errorCode) {
      case 'EMAIL_EXISTS':
        return 'This email exists already.'
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
  }
}
