import { Component, inject, OnInit } from '@angular/core';
import { Load } from '../../../loads/models/load.model';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadCard } from '../../../loads/components/load-card/load-card';
import { User } from '../../../../core/models/user.model';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';

@Component({
  selector: 'app-admin-loads',
  imports: [CommonModule, LoadCard],
  templateUrl: './admin-loads.html',
  styleUrl: './admin-loads.scss',
})
export class AdminLoads implements OnInit {
  loads$!: Observable<Load[]>;
  user$!: Observable<User | null>;

  private adminService = inject(AdminService);
  private store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
    this.loads$ = this.adminService.getAllLoads().pipe();
  }
}
