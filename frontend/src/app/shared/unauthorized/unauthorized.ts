import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthState } from '../../features/auth/store/auth.selectors';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.scss',
})
export class Unauthorized {
  store = inject(Store);

  f() {
    this.store.select(selectAuthState).subscribe(state => {
      console.log(state);
    })
  }
}
