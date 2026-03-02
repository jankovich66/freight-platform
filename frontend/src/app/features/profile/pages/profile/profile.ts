import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { selectCurrentUser } from '../../../auth/store/auth.selectors';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private store = inject(Store);

  user$!: Observable<User | null>;

  ngOnInit(): void {
    this.user$ = this.store.select(selectCurrentUser);
  }
}
