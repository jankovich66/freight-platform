import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { AdminCarrierCard } from '../../components/admin-carrier-card/admin-carrier-card';

@Component({
  selector: 'app-admin-assignments',
  imports: [CommonModule, AdminCarrierCard],
  templateUrl: './admin-assignments.html',
  styleUrl: './admin-assignments.scss',
})
export class AdminAssignments implements OnInit {
  carriersWithAssignments$!: Observable<CarrierWithAssignment[]>;

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.carriersWithAssignments$ = this.adminService.getCarriersWithAssignments();
  }
}
