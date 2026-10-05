import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { selectCurrentUser, selectIsLoggedIn } from '../../../features/auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../features/auth/services/auth.service';
import { logout } from '../../../features/auth/store/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);
  private authService =  inject(AuthService);

  user$: Observable<User | null> = this.store.select(selectCurrentUser);

  isLoggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);

  logout() {
    this.authService.logout();
    this.store.dispatch(logout());
  }
}
