import { Component, Input } from '@angular/core';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-carrier-card',
  imports: [RouterLink],
  templateUrl: './admin-carrier-card.html',
  styleUrl: './admin-carrier-card.scss',
})
export class AdminCarrierCard {
  @Input() carrier!: CarrierWithAssignment;
  @Input() type!: 'assignment' | 'application';
}
