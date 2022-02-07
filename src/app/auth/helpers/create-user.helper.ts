import { User } from '../user.model'
import { AuthResponseData } from './types'

export const createUser = (data: AuthResponseData): User => {
  const { email, localId, idToken } = data
  const expiresIn = +data.expiresIn

  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
  return new User(email, localId, idToken, expirationDate)
}
