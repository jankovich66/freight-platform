import { Component, DestroyRef, inject, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertService } from '../../../../shared/components/alert/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-users',
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers implements OnInit {
  users$!: Observable<User[]>;
  destroyRef = inject(DestroyRef);

  private adminService = inject(AdminService);
  private alertService = inject(AlertService);
  private modalService = inject(NgbModal);

  selectedUserEmail: string | null = null;

  ngOnInit(): void {
    this.users$ = this.adminService.getUsers();
  }

  openDeleteModal(content: TemplateRef<any>, email: string, event: Event) {
    (event?.target as HTMLElement).blur();
    
    this.selectedUserEmail = email;
    this.modalService.open(content, { centered: true });
  }

  confirmDelete(modal: any) {
    if(!this.selectedUserEmail) return;

    this.deleteUser(this.selectedUserEmail);
    modal.close();
  }
  
  deleteUser(email: string) {
    this.adminService.deleteUser(email)
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
          this.alertService.show('success', 'User deleted successfully');
          this.users$ = this.adminService.getUsers();
        },
        error: err => {
          this.alertService.show('danger', err.error.message);
        }
      })
  }
}
