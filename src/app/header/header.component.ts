import { Component } from '@angular/core'
import { DataStorageService } from '../shared/data-storage.service'

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData(): void {
    this.dataStorageService.storeRecipes()
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes()
  }
}

export { HeaderComponent }
