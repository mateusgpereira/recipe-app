import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { Logout } from '../auth/store/auth.actions'
import { userSelector } from '../auth/store/auth.selectors'
import { DataStorageService } from '../shared/data-storage.service'
import { AppState } from '../store/app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false

  private userSubscription: Subscription

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store.select(userSelector).subscribe((user) => {
      this.isAuthenticated = !!user
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes()
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout(): void {
    this.store.dispatch(new Logout())
  }
}

export { HeaderComponent }
