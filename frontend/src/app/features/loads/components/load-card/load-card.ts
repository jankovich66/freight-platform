import { Component, Input } from '@angular/core';
import { Load } from '../../models/load.model';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRole } from '../../../../core/enums/user-role.enum';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-load-card',
  imports: [CommonModule, RouterModule, DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './load-card.html',
  styleUrl: './load-card.scss',
})
export class LoadCard {
  @Input({ required: true }) load!: Load;
  @Input({ required: true }) userRole!: UserRole;
}
