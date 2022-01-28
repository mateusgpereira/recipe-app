/* eslint-disable no-underscore-dangle */
export class User {
  constructor(
    public email: string,
    public localId: string,
    private _token: string,
    private _tokenExpirationDate
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null
    }

    return this._token
  }
}
