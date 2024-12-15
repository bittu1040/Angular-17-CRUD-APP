import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-ui',
  standalone: true,
  imports: [],
  templateUrl: './pagination-ui.component.html',
  styleUrl: './pagination-ui.component.scss'
})
export class PaginationUIComponent {

  pageNumber = 1;
  totalPages= 10;
  currentPageSize: number = 10;
  totalItems: number = 0;
  pageSizes: number[] = [10, 20, 50];
  pageSizeChange = new EventEmitter<number>();
  goToFirstPage(){
    this.pageNumber = 1;
  }
  goToPreviousPage(){
    this.pageNumber--;
  }
  goToNextPage(){
    this.pageNumber++;
  }
  goToLastPage(){
    this.pageNumber = this.totalPages;
  }

  onPageSizeChange(newSize: string): void {
    const size = parseInt(newSize, 10);
    if (size !== this.currentPageSize) {
      this.pageSizeChange.emit(size);
    }
  }

}
