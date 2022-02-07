/* eslint-disable @typescript-eslint/default-param-last */
import { User } from '../user.model'
import {
  AuthActions,
  CLEAR_ERROR,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_START,
  LOGOUT,
  SIGNUP_START
} from './auth.actions'

export interface AuthState {
  user: User
  authError: string
  loading: boolean
}

export const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        authError: null,
        loading: false
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }
}
