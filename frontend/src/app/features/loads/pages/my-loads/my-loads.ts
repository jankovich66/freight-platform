import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { LoadsService } from '../../services/loads.service';
import { LoadCard } from '../../components/load-card/load-card';
import { User } from '../../../../core/models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-my-loads',
  imports: [CommonModule, LoadCard, Pagination],
  templateUrl: './my-loads.html',
  styleUrl: './my-loads.scss',
})
export class MyLoads implements OnInit {
  //loads$!: Observable<Load[]>;
  user$!: Observable<User | null>;

  loads: Load[] = [];
  page = 1;
  limit = 9;
  total = 0;
  lastPage = 1;

  filters: any = {
    title: '',
    pickUpCity: '',
    deliveryCity: ''
  };

  sort = 'pickupDate';
  order: 'ASC' | 'DESC' = 'DESC';

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
    //this.loads$ = this.loadsService.getMyLoads();
    this.fetchLoads();
  }

  fetchLoads() {
    const params = {
      page: this.page,
      limit: this.limit,
      sort: this.sort,
      order: this.order,
      ...this.filters,
    };

    this.loadsService.getMyLoads(params).subscribe(response => {
      this.loads = response.data;
      this.total = response.total;
      this.page = response.page;
      this.limit = response.limit;
      this.lastPage = response.lastPage;
    });
  }

  goToPage(newPage: number) {
    if(newPage >= 1 && newPage <= this.lastPage) {
      this.page = newPage;
      this.fetchLoads();
    }
  }
}
