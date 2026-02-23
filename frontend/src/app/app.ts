import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './features/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { loadCurrentUser } from './features/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  authService = inject(AuthService);
  store = inject(Store);

  ngOnInit() {
    const token = this.authService.getToken();

    if(token && this.authService.isLoggedIn()) {
      this.store.dispatch(loadCurrentUser());
    }
  }
}
