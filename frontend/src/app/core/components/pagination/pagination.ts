import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination implements OnChanges {
  @Input() page!: number;
  @Input() lastPage!: number;

  @Output() pageChange = new EventEmitter<number>();

  numbers : number[] = [];

  ngOnChanges(): void {
    //this.numbers = Array.from({ length: this.lastPage }, (_, i) => i);
  }

  change(newPage: number) {
    this.pageChange.emit(newPage);
  }

  get pages(): (number | string)[] {
    const total = this.lastPage;
    const current = this.page;

    const pages: (number | string)[] = [];

    if(total <= 10) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);

    if(current > 4) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for(let i = start; i <= end; i++) {
      pages.push(i);
    }

    if(current < total - 3) {
      pages.push('...');
    }

    pages.push(total);

    return pages;
  }
}
