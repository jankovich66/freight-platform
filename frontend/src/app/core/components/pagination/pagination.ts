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
    this.numbers = Array.from({ length: this.lastPage }, (_, i) => i);
  }

  change(newPage: number) {
    this.pageChange.emit(newPage);
  }
}
