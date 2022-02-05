import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import Ingredient from 'src/app/shared/ingredient.model'
import ShoppingListService from '../services/shopping-list.services'
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.action'
import { ShoppingListStore } from '../types'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shopForm')
  shopForm: NgForm

  startEditingSubscription: Subscription

  ingredientEditingIndex: number

  ingredientEditing: Ingredient

  editingMode = false

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<ShoppingListStore>
  ) {}

  ngOnInit(): void {
    this.startEditingSubscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.ingredientEditingIndex = index
        this.editingMode = true
        this.ingredientEditing = this.shoppingListService.getIngredient(index)
        this.shopForm.setValue({
          name: this.ingredientEditing.name,
          amount: this.ingredientEditing.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe()
  }

  onShopFormSubmit(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount)

    if (this.editingMode) {
      this.store.dispatch(new UpdateIngredient({ index: this.ingredientEditingIndex, ingredient }))
    } else {
      this.store.dispatch(new AddIngredient(ingredient))
    }
    this.clearShopForm()
  }

  clearShopForm(): void {
    this.editingMode = false
    this.shopForm.reset()
  }

  onDelete(): void {
    this.store.dispatch(new DeleteIngredient(this.ingredientEditingIndex))
    this.clearShopForm()
  }
}
