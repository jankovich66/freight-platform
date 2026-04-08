import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadAssignment } from '../../models/load-assignment.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './assignment-card.html',
  styleUrl: './assignment-card.scss',
})
export class AssignmentCard {
  @Input() assignment!: LoadAssignment;
  @Input() isCarrierView = true;
  
  @Output() start = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();

  onStart() {
    this.start.emit(this.assignment.load);
  }

  onComplete() {
    this.complete.emit(this.assignment.load);
  }

  onCancel() {
    this.cancel.emit(this.assignment.load);
  }
}
