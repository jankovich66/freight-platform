import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentUser, selectIsLoading } from '../../store/auth.selectors';
import { login } from '../../store/auth.actions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;

  private readonly store = inject(Store);
  user$ = this.store.select(selectCurrentUser);
  isLoading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder
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
      this.isLoading$ = this.store.select(selectIsLoading);
    }
  }
}
