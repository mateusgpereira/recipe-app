/* eslint-disable @typescript-eslint/default-param-last */
import { User } from '../user.model'

export interface AuthState {
  user: User
}

export const initialState: AuthState = {
  user: null
}

export const authReducer = (state = initialState, action): AuthState => {
  return state
}
