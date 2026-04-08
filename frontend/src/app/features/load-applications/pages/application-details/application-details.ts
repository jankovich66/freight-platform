import { Component, inject, Input, OnInit } from '@angular/core';
import { LoadApplication } from '../../models/load-application.model';
import { Observable } from 'rxjs/internal/Observable';
import { LoadApplicationsService } from '../../services/load-applications.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-details',
  imports: [CommonModule],
  templateUrl: './application-details.html',
  styleUrl: './application-details.scss',
})
export class ApplicationDetails implements OnInit {
  @Input() id!: number;

  application$!: Observable<LoadApplication>;

  private applicationService = inject(LoadApplicationsService);

  ngOnInit(): void {
    this.application$ = this.applicationService.getApplication(this.id);
  }
}
