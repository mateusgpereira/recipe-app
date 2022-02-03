import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AlertComponent } from './components/alert/alert.component'
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'
import { PlaceholderDirective } from './directives/placeholder/placeholder.directive'

const sharedComponents = [AlertComponent, LoadingSpinnerComponent]

const sharedDirectives = [PlaceholderDirective]

@NgModule({
  declarations: [sharedComponents, sharedDirectives],
  imports: [CommonModule],
  exports: [sharedComponents, sharedDirectives, CommonModule]
})
export class SharedModule {}
