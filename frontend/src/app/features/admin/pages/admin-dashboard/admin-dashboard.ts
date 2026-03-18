import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  private adminService = inject(AdminService);

  numberOfUsers$!: Observable<number>;
  numberOfLoads$!: Observable<number>;
  numberOfActiveLoads$!: Observable<number>;

  ngOnInit(): void {
    this.numberOfUsers$ = this.adminService.numberOfUsers();
    this.numberOfLoads$ = this.adminService.numberOfLoads();
    this.numberOfActiveLoads$ = this.adminService.numberOfActiveLoads();
  }
}
