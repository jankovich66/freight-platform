import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadApplication } from '../../models/load-application.model';
import { LoadApplicationsService } from '../../services/load-applications.service';
import { CommonModule } from '@angular/common';
import { ApplicationCard } from '../../components/application-card/application-card';

@Component({
  selector: 'app-my-applications',
  imports: [CommonModule, ApplicationCard],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.scss',
})
export class MyApplications implements OnInit {
  applications$!: Observable<LoadApplication[]>;

  private loadApplicationService = inject(LoadApplicationsService);

  ngOnInit(): void {
    this.applications$ = this.loadApplicationService.findByCarrier();
  }
}
