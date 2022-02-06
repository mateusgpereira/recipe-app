/* eslint-disable @typescript-eslint/default-param-last */
import { User } from '../user.model'
import { AuthActions, LOGIN, LOGOUT } from './auth.actions'

export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: null
}

export const authReducer = (state = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state
  }
}
