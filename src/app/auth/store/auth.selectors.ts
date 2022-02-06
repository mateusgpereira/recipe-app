import { AppState } from 'src/app/store/app.reducer'
import { User } from '../user.model'

export const userSelector = (appState: AppState): User => appState.auth.user
