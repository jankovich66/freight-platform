import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadAssignment } from '../../models/load-assignment.model';
import { LoadAssignmentsService } from '../../services/load-assignments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-details',
  imports: [CommonModule],
  templateUrl: './assignment-details.html',
  styleUrl: './assignment-details.scss',
})
export class AssignmentDetails implements OnInit {
  @Input() id!: number;

  assignment$!: Observable<LoadAssignment>;

  private assignmentService = inject(LoadAssignmentsService);

  ngOnInit(): void {
    this.assignment$ = this.assignmentService.getById(this.id);
  }
}
