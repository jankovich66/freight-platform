import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadAssignment } from '../../../load-assignments/models/load-assignment.model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-assignments-details',
  imports: [CommonModule],
  templateUrl: './admin-assignments-details.html',
  styleUrl: './admin-assignments-details.scss',
})
export class AdminAssignmentsDetails implements OnInit {
  assignments$!: Observable<LoadAssignment[]>;

  @Input() carrierId!: number;

  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.assignments$ = this.adminService.getAssignmentsForCarrier(this.carrierId);
  }
}
