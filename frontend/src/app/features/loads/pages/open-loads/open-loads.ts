import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Load } from '../../models/load.model';
import { LoadsService } from '../../services/loads.service';
import { User } from '../../../../core/models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';
import { LoadCard } from '../../components/load-card/load-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Pagination } from '../../../../core/components/pagination/pagination';

@Component({
  selector: 'app-open-loads',
  imports: [CommonModule, LoadCard, Pagination],
  templateUrl: './open-loads.html',
  styleUrl: './open-loads.scss',
})
export class OpenLoads implements OnInit {
  //loads$!: Observable<Load[]>;
  user$!: Observable<User | null>;

  loads: Load[] = [];
  page = 1;
  limit = 9;
  total = 0;
  lastPage = 1;

  filters: any = {
    title: '',
    pickupCity: '',
    deliveryCity: '',
  };

  sort = 'pickupDate';
  order: 'ASC' | 'DESC' = 'DESC';

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  constructor(private loadsService: LoadsService) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
    //this.loads$ = this.loadsService.getOpenLoads().pipe(map(response => response.data));
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
    
    this.loadsService.getOpenLoads(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      this.loads = response.data;
      this.total = response.total;
      this.page = response.page;
      this.limit = response.limit;
      this.lastPage = response.lastPage;
    });
  }

  goToPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.lastPage) {
      this.page = newPage;
      this.fetchLoads();
    }
  }
}
