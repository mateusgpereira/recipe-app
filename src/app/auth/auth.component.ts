import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { AlertComponent } from '../shared/components/alert/alert.component'
import { PlaceholderDirective } from '../shared/directives/placeholder/placeholder.directive'
import { AuthResponseData, AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true

  isLoading = false

  error: string

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective

  alertCloseSubscription: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnDestroy(): void {
    if (this.alertCloseSubscription) {
      this.alertCloseSubscription.unsubscribe()
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
    this.isLoading = true

    let authResponse: Observable<AuthResponseData>

    if (this.isLoginMode) {
      authResponse = this.authService.login(email, password)
    } else {
      authResponse = this.authService.signUp(email, password)
    }

    authResponse.subscribe(
      (res) => {
        console.log(res)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      },
      (errorMessage) => {
        this.error = errorMessage
        this.showAlertError(errorMessage)
        this.isLoading = false
      }
    )

    form.reset()
  }

  onCloseAlert(): void {
    this.error = null
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
