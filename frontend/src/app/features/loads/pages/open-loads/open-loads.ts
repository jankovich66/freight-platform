import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { LoadsService } from '../../services/loads.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-open-loads',
  imports: [CommonModule, RouterLink],
  templateUrl: './open-loads.html',
  styleUrl: './open-loads.scss',
})
export class OpenLoads implements OnInit {
  loads$!: Observable<Load[]>

  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.loads$ = this.loadsService.getOpenLoads();
  }
}
