import { Component } from '@angular/core';
import { views } from './header/header.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentView: views = 'recipes'

  onViewChanged(view: views) {
    this.currentView = view
  }
}
