import { Component, Input } from '@angular/core';
import { Load } from '../../models/load.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRole } from '../../../../core/enums/user-role.enum';

@Component({
  selector: 'app-load-card',
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './load-card.html',
  styleUrl: './load-card.scss',
})
export class LoadCard {
  @Input({ required: true }) load!: Load;
  @Input({ required: true }) userRole!: UserRole;
}
