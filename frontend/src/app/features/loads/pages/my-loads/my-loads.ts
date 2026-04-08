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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-loads',
  imports: [CommonModule, LoadCard, Pagination, FormsModule],
  templateUrl: './my-loads.html',
  styleUrl: './my-loads.scss',
})
export class MyLoads implements OnInit {
  //loads$!: Observable<Load[]>;
  user$!: Observable<User | null>;

  loads: Load[] = [];
  page = 1;
  limit = 6;
  total = 0;
  lastPage = 1;

  isLoading = false;

  filters: any = {
    search: ''
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

    Object.keys(params).forEach(key => {
      if(!params[key]) {
        delete params[key];
      }
    });

    this.isLoading = true;

    this.loadsService.getMyLoads(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      this.loads = response.data;
      this.total = response.total;
      this.page = response.page;
      this.limit = response.limit;
      this.lastPage = response.lastPage;
      this.isLoading = false;
    });
  }

  goToPage(newPage: number) {
    if(newPage >= 1 && newPage <= this.lastPage) {
      this.page = newPage;
      this.fetchLoads();
    }
  }

  applyFilters() {
    this.page = 1;
    this.fetchLoads();
  }

  toggleOrder() {
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    this.fetchLoads();
  }
}
