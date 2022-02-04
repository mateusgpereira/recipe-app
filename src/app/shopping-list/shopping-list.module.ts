import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component'
import { ShoppingListComponent } from './shopping-list.component'

const routes: Routes = [{ path: '', component: ShoppingListComponent }]

const shoppingListComponents = [ShoppingListComponent, ShoppingEditComponent]
@NgModule({
  declarations: [shoppingListComponents],
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListModule {}
