import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { AlertComponent } from '../shared/components/alert/alert.component'
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive'
import { AppState } from '../store/app.reducer'
import { ClearError, LoginStart, SignupStart } from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true

  isLoading = false

  error: string

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective

  alertCloseSubscription: Subscription

  storeSubscription: Subscription

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading
      this.error = authState.authError

      if (this.error) {
        this.showAlertError(this.error)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.alertCloseSubscription) {
      this.alertCloseSubscription.unsubscribe()
    }

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe()
    }
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return
    }
    const { email, password } = form.value

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart({ email, password }))
    } else {
      this.store.dispatch(new SignupStart({ email, password }))
    }

    form.reset()
  }

  onCloseAlert(): void {
    this.store.dispatch(new ClearError())
  }

  private showAlertError(message: string): void {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const alertComponent = hostViewContainerRef.createComponent(alertFactory)
    alertComponent.instance.message = message
    this.alertCloseSubscription = alertComponent.instance.closeAlert.subscribe(() => {
      hostViewContainerRef.clear()
      this.alertCloseSubscription.unsubscribe()
    })
  }
}
