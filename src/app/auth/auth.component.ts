import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthResponseData, AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = false

  isLoading = false

  error: string

  constructor(private authService: AuthService, private router: Router) {}

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
        this.isLoading = false
      }
    )

    form.reset()
  }
}
