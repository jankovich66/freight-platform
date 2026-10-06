import { Component, Input } from '@angular/core';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin-carrier-card',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './admin-carrier-card.html',
  styleUrl: './admin-carrier-card.scss',
})
export class AdminCarrierCard {
  @Input() carrier!: CarrierWithAssignment;
  @Input() type!: 'assignment' | 'application';
}
