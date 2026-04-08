import { Component, Input } from '@angular/core';
import { LoadApplication } from '../../models/load-application.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-application-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './application-card.html',
  styleUrl: './application-card.scss',
})
export class ApplicationCard {
  @Input() application!: LoadApplication;
}
