import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { LoadsService } from '../../services/loads.service';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { CommonModule } from '@angular/common';
import { LoadApplicationsService } from '../../../load-applications/services/load-applications.service';
import { CreateLoadApplication } from '../../../load-applications/models/create-load-application.model';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../../auth/store/auth.selectors';
import { UserRole } from '../../../../core/enums/user-role.enum';
import { LoadApplication } from '../../../load-applications/models/load-application.model';
import { Router } from '@angular/router';
import { AlertService } from '../../../../shared/components/alert/services/alert.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-load-details',
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatDividerModule],
  templateUrl: './load-details.html',
  styleUrl: './load-details.scss',
})
export class LoadDetails implements OnInit {
  @Input() id!: number;
  offeredPrice: number = 0;

  load$!: Observable<Load>;
  userRole$?: Observable<UserRole | null>;
  loadApplications$!: Observable<LoadApplication[]>;
  // private modalService = inject(NgbModal);
  private dialog = inject(MatDialog);

  store = inject(Store);

  private destroyRef = inject(DestroyRef);
  constructor(
    private loadsService: LoadsService,
    private loadApplicationsService: LoadApplicationsService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load$ = this.loadsService.getLoadDetails(this.id);
    this.userRole$ = this.store.select(selectUserRole);
    this.loadApplications$ = this.loadApplicationsService.findByLoad(this.id);
  }
  
  apply() {
    //Dodati proveru da li je validna vrednost
    const createLoadApplication: CreateLoadApplication = {
      loadId: this.id,
      offeredPrice: this.offeredPrice
    }
    
    this.loadApplicationsService.apply(createLoadApplication)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: response => {
        // console.log("Applied successfully: ", response);
        this.alertService.show('success', 'You have successfully applied for this load');
        this.refreshApplications();
        this.offeredPrice = 0;
      },
      error: err => this.alertService.show('warning', err.error.message)
    })
  }
  
  accept(applicationId: number) {
    this.loadApplicationsService.accept(applicationId)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: response => {
        // console.log(response)
        this.alertService.show('success', 'You have successfully accepted this application');
        this.refreshApplications();
        this.refreshLoad();
      },
      error: err => this.alertService.show('warning', err.error.message)
    })
  }

  openDeleteDialog(templateRef: any) {
    // this.modalService.open(content, { centered: true });
    this.dialog.open(templateRef, {
      width: '400px',
      disableClose: true
    })
  }

  confirmDelete(dialogRef: MatDialogRef<any>) {
    this.deleteLoad();
    dialogRef.close();
  }
  
  deleteLoad() {
    this.loadsService.deleteLoad(this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          this.alertService.show('success', 'You have successfully deleted this load', 4000);
          setTimeout(() => {
            this.router.navigate(['loads/my'])
          }, 5000);
        },
        error: err => this.alertService.show('warning', err.error.message)
      })
  }

  private refreshApplications() {
    this.loadApplications$ = this.loadApplicationsService.findByLoad(this.id);
  }

  private refreshLoad() {
    this.load$ = this.loadsService.getLoadDetails(this.id);
  }
}
