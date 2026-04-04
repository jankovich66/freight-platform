import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadApplication } from '../../../load-applications/models/load-application.model';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { AdminCarrierCard } from '../../components/admin-carrier-card/admin-carrier-card';

@Component({
  selector: 'app-admin-applications',
  imports: [CommonModule, AdminCarrierCard],
  templateUrl: './admin-applications.html',
  styleUrl: './admin-applications.scss',
})
export class AdminApplications implements OnInit {
  carriersWithApplications$!: Observable<CarrierWithAssignment[]>;

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.carriersWithApplications$ = this.adminService.getCarriersWithApplications();
  }
}
