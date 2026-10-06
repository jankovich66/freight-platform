import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadsService } from '../../services/loads.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../shared/components/alert/services/alert.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-load',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatIconModule],
  templateUrl: './create-load.html',
  styleUrl: './create-load.scss',
})
export class CreateLoad {
  private destroyRef = inject(DestroyRef);
  registerForm: FormGroup;

  constructor(
    private loadsService: LoadsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
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
      deliveryDate: ['', Validators.required],
      transportType: ['FTL', Validators.required],
      requiredSpaceLdm: [{ value: 13.6, disabled: true }, [Validators.required, Validators.min(0.1), Validators.max(13.6)]],
    });

    this.registerForm.get('transportType')?.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(type => {
        const spaceControl = this.registerForm.get('requiredSpaceLdm');
        if (type === 'FTL') {
          spaceControl?.setValue(13.6);
          spaceControl?.disable();
        }
        else {
          spaceControl?.enable();
          spaceControl?.setValue(2.4);
        }
      })
  }

  onSubmit() {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const body = this.registerForm.getRawValue();

    this.loadsService.createLoad(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.showAndNavigate('success', 'Load successfully created', this.router, '/loads/my');
          // this.router.navigate(['/loads/my']);
        },
        error: err => {
          this.alertService.show('warning', err.error.message);
          // console.log(err);
        }
      })
  }
}
