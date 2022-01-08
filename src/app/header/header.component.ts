import { Component, EventEmitter, Output } from "@angular/core";

type views = 'recipes' | 'shop-list'
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
class HeaderComponent {

  selectedView: views

  @Output()
  onViewChanged = new EventEmitter<views>();

  selectView(selectedView: views) {
    this.selectedView = selectedView
    this.onViewChanged.emit(this.selectedView)
  }

}

export { HeaderComponent, views }
