export interface AuthResponseData {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

export interface UserData {
  email: string
  localId: string
  _token: string
  _tokenExpirationDate: string
}
