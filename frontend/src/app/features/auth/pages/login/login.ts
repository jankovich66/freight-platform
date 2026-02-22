import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsLoading } from '../../store/auth.selectors';
import { login } from '../../store/auth.actions';
import { LoginRequest } from '../../models/login-request.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  private readonly store = inject(Store);
  isLoading$ = this.store.select(selectIsLoading);
  user$ = this.store.select(selectCurrentUser);

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.store.dispatch(login({ email, password }));
      /*
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.log(err);
        }
      });*/
    }
  }
}
