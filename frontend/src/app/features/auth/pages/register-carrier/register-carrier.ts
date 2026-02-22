import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-carrier',
  imports: [ReactiveFormsModule],
  templateUrl: './register-carrier.html',
  styleUrl: './register-carrier.scss',
})
export class RegisterCarrier {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
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
          this.router.navigate(['/']);
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
