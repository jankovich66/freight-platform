import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadApplication } from '../../../load-applications/models/load-application.model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-applications-details',
  imports: [CommonModule],
  templateUrl: './admin-applications-details.html',
  styleUrl: './admin-applications-details.scss',
})
export class AdminApplicationsDetails implements OnInit {
  applications$!: Observable<LoadApplication[]>;

  @Input() carrierId!: number;

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.applications$ = this.adminService.getApplicationsForCarrier(this.carrierId);
  }
}
