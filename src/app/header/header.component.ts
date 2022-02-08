import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Logout } from '../auth/store/auth.actions'
import { userSelector } from '../auth/store/auth.selectors'
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.actions'
import { AppState } from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false

  private userSubscription: Subscription

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(userSelector).subscribe((user) => {
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  onSaveData(): void {
    this.store.dispatch(new StoreRecipes())
  }

  onFetchData(): void {
    this.store.dispatch(new FetchRecipes())
  }

  onLogout(): void {
    this.store.dispatch(new Logout())
  }
}

export { HeaderComponent }
