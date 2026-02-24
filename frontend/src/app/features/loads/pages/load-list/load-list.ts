import { Component, OnInit } from '@angular/core';
import { LoadsService } from '../../services/loads.service';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-list',
  imports: [CommonModule],
  templateUrl: './load-list.html',
  styleUrl: './load-list.scss',
})
export class LoadList implements OnInit {
  loads$!: Observable<Load[]>;
  
  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.loads$ = this.loadsService.getAllLoads();
  }
}
