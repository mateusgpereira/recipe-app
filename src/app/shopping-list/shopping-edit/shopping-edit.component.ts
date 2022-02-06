import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import Ingredient from 'src/app/shared/ingredient.model'
import {
  AddIngredient,
  DeleteIngredient,
  StopEdit,
  UpdateIngredient
} from '../store/shopping-list.action'
import { AppState } from '../types'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shopForm')
  shopForm: NgForm

  startEditingSubscription: Subscription

  ingredientEditing: Ingredient

  editingMode = false

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.startEditingSubscription = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {
        this.editingMode = true
        this.ingredientEditing = stateData.editedIngredient
        this.shopForm.setValue({
          name: this.ingredientEditing.name,
          amount: this.ingredientEditing.amount
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe()
    this.store.dispatch(new StopEdit())
  }

  onShopFormSubmit(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount)

    if (this.editingMode) {
      this.store.dispatch(new UpdateIngredient(ingredient))
    } else {
      this.store.dispatch(new AddIngredient(ingredient))
    }
    this.clearShopForm()
  }

  clearShopForm(): void {
    this.editingMode = false
    this.store.dispatch(new StopEdit())
    this.shopForm.reset()
  }

  onDelete(): void {
    this.store.dispatch(new DeleteIngredient())
    this.clearShopForm()
  }
}
