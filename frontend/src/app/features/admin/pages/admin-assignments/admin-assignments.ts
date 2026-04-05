import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CarrierWithAssignment } from '../../models/carrier-with-assignment.model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { AdminCarrierCard } from '../../components/admin-carrier-card/admin-carrier-card';
import { Pagination } from '../../../../core/components/pagination/pagination';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-assignments',
  imports: [CommonModule, AdminCarrierCard, Pagination],
  templateUrl: './admin-assignments.html',
  styleUrl: './admin-assignments.scss',
})
export class AdminAssignments implements OnInit {
  //carriersWithAssignments$!: Observable<CarrierWithAssignment[]>;

  carriersWithAssignments: CarrierWithAssignment[] = [];
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
    //this.carriersWithAssignments$ = this.adminService.getCarriersWithAssignments();
    this.fetchCarriersWithAssignments();
  }

  fetchCarriersWithAssignments() {
    const params = {
      page: this.page,
      limit: this.limit,
      ...this.filters,
    };

    this.adminService.getCarriersWithAssignments(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(response => {
      this.carriersWithAssignments = response.data;
      this.total = response.total;
      this.page = response.page;
      this.limit = response.limit;
      this.lastPage = response.lastPage;
    });
  }

  goToPage(newPage: number) {
    if(newPage >= 1 && newPage <= this.lastPage) {
      this.page = newPage;
      this.fetchCarriersWithAssignments();
    }
  }
}
