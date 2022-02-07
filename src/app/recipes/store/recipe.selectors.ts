import { AppState } from 'src/app/store/app.reducer'

export const recipesSelector = (appState: AppState) => appState.recipe.recipes
