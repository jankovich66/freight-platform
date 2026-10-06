import { Component, Input } from '@angular/core';
import { LoadApplication } from '../../models/load-application.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-application-card',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './application-card.html',
  styleUrl: './application-card.scss',
})
export class ApplicationCard {
  @Input() application!: LoadApplication;
}
