import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { RecipeRoutingModule } from './recipe-routing.module'
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component'
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component'
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component'
import { RecipeListComponent } from './recipe-list/recipe-list.component'
import { RecipeStartComponent } from './recipe-start/recipe-start.component'
import { RecipesComponent } from './recipes.component'

const recipesComponents = [
  RecipesComponent,
  RecipeListComponent,
  RecipeItemComponent,
  RecipeDetailComponent,
  RecipeStartComponent,
  RecipeEditComponent
]
@NgModule({
  declarations: [recipesComponents],
  imports: [RouterModule, CommonModule, ReactiveFormsModule, RecipeRoutingModule]
})
export class RecipeModule {}
