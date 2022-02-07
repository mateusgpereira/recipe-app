/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '../store/app.reducer'
import { Logout } from './store/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private expirationTimer: any

  constructor(private store: Store<AppState>) {}

  setLogoutTimer(expirationDurationInMs: number): void {
    this.expirationTimer = setTimeout(() => {
      this.store.dispatch(new Logout())
    }, expirationDurationInMs)
  }

  clearLogoutTimer(): void {
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer)
      this.expirationTimer = null
    }
  }
}
