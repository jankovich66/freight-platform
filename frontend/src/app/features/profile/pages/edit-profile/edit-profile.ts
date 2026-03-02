import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile.service';
import { AlertService } from '../../../../shared/components/alert/services/alert.service';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfile implements OnInit {
  private store = inject(Store);
  editForm: FormGroup;
  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private alertService: AlertService
  ) {
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.store.select(selectCurrentUser)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        take(1)
      )
      .subscribe(user => {
        if(user) {
          this.editForm.patchValue({
            email: user.email,
            phoneNumber: user.phoneNumber,
            companyName: user.companyName
          })
        }
      })
  }

  onSave() {
    if(this.editForm.invalid) return;

    this.profileService.updateProfile(this.editForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.showAndNavigate('success', 'Profile updated successfully', this.router, '/profile');
        },
        error: err => this.alertService.show('danger', err.error.message)
      })
  }

  onCancel() {
    this.router.navigate(['/profile']);
  }
}
