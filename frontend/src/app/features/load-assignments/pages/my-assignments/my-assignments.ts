import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { LoadAssignment } from '../../models/load-assignment.model';
import { map, Observable } from 'rxjs';
import { LoadAssignmentsService } from '../../services/load-assignments.service';
import { CommonModule } from '@angular/common';
import { LoadsService } from '../../../loads/services/loads.service';
import { LoadStatus } from '../../../loads/enums/load-status.enum';
import { Load } from '../../../loads/models/load.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../shared/components/alert/services/alert.service';

@Component({
  selector: 'app-my-assignments',
  imports: [CommonModule],
  templateUrl: './my-assignments.html',
  styleUrl: './my-assignments.scss',
})
export class MyAssignments implements OnInit {
  assignments$!: Observable<LoadAssignment[]>;
  
  private loadAssignmentsService = inject(LoadAssignmentsService);
  private loadsService = inject(LoadsService);
  private destroyRef = inject(DestroyRef);
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.assignments$ = this.loadAssignmentsService.getMy();
  }

  startTransport(load: Load) {
    const updatedLoad = {
      ...load,
      status: LoadStatus.IN_PROGRESS
    }
    this.loadsService.changeStatus(updatedLoad)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.show('success', `You have successfully changed load status to 'In progress'`);
          this.assignments$ = this.loadAssignmentsService.getMy();
        },
        error: err => {
          this.alertService.show('warning', err.error.message);
        }
      });
  }

  completeTransport(load: Load) {
    const updatedLoad = {
      ...load,
      status: LoadStatus.COMPLETED
    }
    this.loadsService.changeStatus(updatedLoad)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.show('success', `You have successfully changed load status to 'Completed'`);
          this.assignments$ = this.loadAssignmentsService.getMy();
        },
        error: err => {
          this.alertService.show('warning', err.error.message);
        }
      });
  }

  cancelTransport(load: Load) {
    const updatedLoad = {
      ...load,
      status: LoadStatus.CANCELED
    }
    this.loadsService.changeStatus(updatedLoad)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.alertService.show('success', `You have successfully changed load status to 'Canceled'`);
          this.assignments$ = this.loadAssignmentsService.getMy();
        },
        error: err => {
          this.alertService.show('warning', err.error.message);
        }
      });
  }
}
