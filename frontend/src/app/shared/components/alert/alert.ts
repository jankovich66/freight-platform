import { Component, Input } from '@angular/core';
import { AlertService } from './services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  // @Input() message: string | null = null;
  // @Input() type: 'success' | 'danger' | 'info' = 'info';
  constructor(public alertService: AlertService) {}
}
