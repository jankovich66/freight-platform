import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-unauthorized',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.scss',
})
export class Unauthorized {
  private location = inject(Location);

  goBack() {
    this.location.back()
  }
}
