import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
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
      companyName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);
    this.authService.register({ email: this.registerForm.value.email, password: this.registerForm.value.password, phoneNumber: this.registerForm.value.phoneNumber, companyName: this.registerForm.value.companyName, role: this.registerForm.value.role})
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
