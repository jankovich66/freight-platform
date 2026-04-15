import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth.actions';

@Component({
  selector: 'app-register-carrier',
  imports: [ReactiveFormsModule],
  templateUrl: './register-carrier.html',
  styleUrl: './register-carrier.scss',
})
export class RegisterCarrier {
  registerForm: FormGroup;

  private store = inject(Store);

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.authService.registerCarrier({ email: this.registerForm.value.email, password: this.registerForm.value.password, phoneNumber: this.registerForm.value.phoneNumber, companyName: this.registerForm.value.companyName })
      .subscribe({
        next: () => {
          this.store.dispatch(login({email: this.registerForm.value.email, password: this.registerForm.value.password}));
          this.router.navigate(['/loads/open']);
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
