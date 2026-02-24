import { Component, Input, OnInit } from '@angular/core';
import { LoadsService } from '../../services/loads.service';
import { map, Observable } from 'rxjs';
import { Load } from '../../models/load.model';

@Component({
  selector: 'app-load-details',
  imports: [],
  templateUrl: './load-details.html',
  styleUrl: './load-details.scss',
})
export class LoadDetails implements OnInit {
  @Input() loadId!: number;
  load$!: Observable<Load>;
  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.load$ = this.loadsService.getLoadDetails(this.loadId);
  }
}
