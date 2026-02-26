import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadsService } from '../../services/loads.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create-load',
  imports: [ReactiveFormsModule],
  templateUrl: './create-load.html',
  styleUrl: './create-load.scss',
})
export class CreateLoad {
  private destroyRef = inject(DestroyRef);
  registerForm: FormGroup;

  constructor(
    private loadsService: LoadsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      pickupAddress: ['', Validators.required],
      pickupCity: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryCity: ['', Validators.required],
      weight: ['', Validators.required],
      price: ['', Validators.required],
      pickupDate: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loadsService.createLoad({ title: this.registerForm.value.title, description: this.registerForm.value.description, pickupAddress: this.registerForm.value.pickupAddress, pickupCity: this.registerForm.value.pickupCity, deliveryAddress: this.registerForm.value.deliveryAddress, deliveryCity: this.registerForm.value.deliveryCity, weight: this.registerForm.value.weight, price: this.registerForm.value.price, pickupDate: this.registerForm.value.pickupDate, deliveryDate: this.registerForm.value.deliveryDate })
      .pipe(takeUntilDestroyed(this.destroyRef))
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
