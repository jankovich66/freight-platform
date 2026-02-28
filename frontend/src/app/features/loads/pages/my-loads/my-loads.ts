import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { LoadsService } from '../../services/loads.service';
import { LoadCard } from '../../components/load-card/load-card';
import { User } from '../../../../core/models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';

@Component({
  selector: 'app-my-loads',
  imports: [CommonModule, LoadCard],
  templateUrl: './my-loads.html',
  styleUrl: './my-loads.scss',
})
export class MyLoads implements OnInit {
  loads$!: Observable<Load[]>;
  user$!: Observable<User | null>;
  private store = inject(Store);

  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
    this.loads$ = this.loadsService.getMyLoads();
  }
}
