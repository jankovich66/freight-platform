import { Component, inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadAssignment } from '../../models/load-assignment.model';
import { LoadAssignmentsService } from '../../services/load-assignments.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-assignment-details',
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
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
