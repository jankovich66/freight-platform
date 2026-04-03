import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadApplication } from '../../../load-applications/models/load-application.model';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-applications',
  imports: [CommonModule],
  templateUrl: './admin-applications.html',
  styleUrl: './admin-applications.scss',
})
export class AdminApplications implements OnInit {
  applications$!: Observable<LoadApplication[]>;

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.applications$ = this.adminService.getAllApplications();
  }
}
