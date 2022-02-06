import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { StartEdit } from './store/shopping-list.action'
import { AppState, ShoppingListState } from './types'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<ShoppingListState>

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  onItemClick(index: number): void {
    this.store.dispatch(new StartEdit(index))
  }
}
