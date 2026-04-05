import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadApplication } from '../../../load-applications/models/load-application.model';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { AdminCarrierCard } from '../../components/admin-carrier-card/admin-carrier-card';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-applications',
  imports: [CommonModule, AdminCarrierCard, Pagination],
  templateUrl: './admin-applications.html',
  styleUrl: './admin-applications.scss',
})
export class AdminApplications implements OnInit {
  //carriersWithApplications$!: Observable<CarrierWithAssignment[]>;

  carriersWithApplications: CarrierWithAssignment[] = [];
  page = 1;
  limit = 9;
  total = 0;
  lastPage = 1;

  filters: any = {
    companyName: '',
  };

  private adminService = inject(AdminService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    //this.carriersWithApplications$ = this.adminService.getCarriersWithApplications();
    this.fetchCarriersWithApplications();
  }

  fetchCarriersWithApplications() {
    const params = {
      page: this.page,
      limit: this.limit,
      ...this.filters,
    };
    this.adminService.getCarriersWithApplications(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((response) => {
      this.carriersWithApplications = response.data;
      this.total = response.total;
      this.page = response.page;
      this.limit = response.limit;
      this.lastPage = response.lastPage;
    });
  }

  goToPage(newPage: number) {
    if(newPage >= 1 && newPage <= this.lastPage) {
      this.page = newPage;
      this.fetchCarriersWithApplications();
    }
  }
}
