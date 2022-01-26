import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from '../../environments/environment'

interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${environment.authBaseUrl}/accounts:signUp?key=${environment.apiKey}`,
        {
          email,
          password
        }
      )
      .pipe(
        catchError((errorResponse) => {
          const errorCode = errorResponse.error?.error?.message ?? ''
          const errorMessage = this.handleErrorcode(errorCode)
          return throwError(errorMessage)
        })
      )
  }

  private handleErrorcode(errorCode: string): string {
    switch (errorCode) {
      case 'EMAIL_EXISTS':
        return 'This email exists already.'
      default:
        return 'An unkown error has occurred.'
    }
  }
}
