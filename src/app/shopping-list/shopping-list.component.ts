import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import ShoppingListService from './services/shopping-list.services'
import { ShoppingListStore } from './types'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<ShoppingListStore['shoppingList']>

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<ShoppingListStore>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  onItemClick(index: number): void {
    this.shoppingListService.startedEditing.next(index)
  }
}
