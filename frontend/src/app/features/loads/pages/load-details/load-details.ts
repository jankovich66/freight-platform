import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { LoadsService } from '../../services/loads.service';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { CommonModule } from '@angular/common';
import { LoadApplicationsService } from '../../../load-applications/services/load-applications.service';
import { CreateLoadApplication } from '../../../load-applications/models/create-load-application.model';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-load-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './load-details.html',
  styleUrl: './load-details.scss',
})
export class LoadDetails implements OnInit {
  @Input() id!: number;
  offeredPrice: number = 0;

  load$!: Observable<Load>;

  private destroyRef = inject(DestroyRef);
  constructor(
    private loadsService: LoadsService,
    private loadApplicationsService: LoadApplicationsService
  ) {}

  ngOnInit(): void {
    this.load$ = this.loadsService.getLoadDetails(this.id);
  }

  apply() {
    const createLoadApplication: CreateLoadApplication = {
      loadId: this.id,
      offeredPrice: this.offeredPrice
    }

    this.loadApplicationsService.apply(createLoadApplication)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: response => {
          console.log("Applied successfully: ", response);
        },
        error: err => console.log(err.message)
      })
  }
}
