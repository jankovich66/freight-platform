import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  @Input() user!: User;

  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.user.email);
  }
}
