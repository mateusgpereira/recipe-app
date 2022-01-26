import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = false

  isLoading = false

  error: string

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return
    }
    const { email, password } = form.value
    this.isLoading = true

    if (this.isLoginMode) {
      console.log('login...')
    } else {
      this.authService.signUp(email, password).subscribe(
        (res) => {
          console.log(res)
          this.isLoading = false
        },
        (errorMessage) => {
          this.error = errorMessage
          this.isLoading = false
        }
      )
    }

    form.reset()
  }
}
