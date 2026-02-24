import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { LoadsService } from '../../services/loads.service';

@Component({
  selector: 'app-my-loads',
  imports: [CommonModule],
  templateUrl: './my-loads.html',
  styleUrl: './my-loads.scss',
})
export class MyLoads implements OnInit {
  loads$!: Observable<Load[]>

  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.loads$ = this.loadsService.getMyLoads();
  }
}
