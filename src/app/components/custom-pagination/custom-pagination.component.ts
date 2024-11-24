import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="pagination-container">
      <div class="pagination-controls">
        <button 
          class="page-btn"
          [disabled]="currentPage === 1"
          (click)="onPageChange(1)"
          title="First page">
          &lt;&lt;
        </button>
        <button 
          class="page-btn"
          [disabled]="currentPage === 1"
          (click)="onPageChange(currentPage - 1)"
          title="Previous page">
          &lt;
        </button>
        <span class="page-info">page {{ currentPage }} of {{ totalPages }}</span>
        <button 
          class="page-btn"
          [disabled]="currentPage === totalPages"
          (click)="onPageChange(currentPage + 1)"
          title="Next page">
          &gt;
        </button>
        <button 
          class="page-btn"
          [disabled]="currentPage === totalPages"
          (click)="onPageChange(totalPages)"
          title="Last page">
          &gt;&gt;
        </button>
      </div>

      <div class="results-info">
        <div class="page-size-selector">
          Results per page
          <select [(ngModel)]="pageSize" (ngModelChange)="onPageSizeChange($event)">
            <option [ngValue]="10">10</option>
            <option [ngValue]="20">20</option>
            <option [ngValue]="50">50</option>
          </select>
        </div>
        <span class="total-items">of {{ totalItems }}</span>
      </div>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background-color: #f8f9fa;
      border-top: 1px solid #dee2e6;
      font-size: 14px;
    }

    .pagination-controls {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-btn {
      padding: 0.25rem 0.5rem;
      border: 1px solid #dee2e6;
      background-color: #fff;
      color: #007bff;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 4px;
      min-width: 32px;
      font-size: 14px;
    }

    .page-btn:hover:not(:disabled) {
      background-color: #e9ecef;
      border-color: #dee2e6;
      color: #0056b3;
    }

    .page-btn:disabled {
      background-color: #e9ecef;
      border-color: #dee2e6;
      color: #6c757d;
      cursor: not-allowed;
    }

    .page-info {
      color: #6c757d;
      padding: 0 0.5rem;
    }

    .results-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #6c757d;
    }

    .page-size-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .page-size-selector select {
      padding: 0.25rem 0.5rem;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      background-color: #fff;
      cursor: pointer;
      font-size: 14px;
    }

    .total-items {
      white-space: nowrap;
    }
  `]
})
export class CustomPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(newSize: number): void {
    if (newSize !== this.pageSize) {
      this.pageSizeChange.emit(newSize);
    }
  }
}
