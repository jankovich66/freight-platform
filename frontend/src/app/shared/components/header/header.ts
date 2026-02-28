import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { selectCurrentUser, selectIsLoggedIn } from '../../../features/auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth.service';
import { logout } from '../../../features/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);

  constructor(private authService: AuthService) {}

  user$: Observable<User | null> = this.store.select(selectCurrentUser);
  
  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);

  logout() {
    this.authService.logout();
    this.store.dispatch(logout());
  }
}
