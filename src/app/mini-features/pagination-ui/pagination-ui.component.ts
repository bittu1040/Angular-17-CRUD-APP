import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-ui',
  standalone: true,
  imports: [],
  templateUrl: './pagination-ui.component.html',
  styleUrl: './pagination-ui.component.scss'
})
export class PaginationUIComponent {

  @Input() currentPageNumber : number = 1;
  @Input() totalPages: number = 0;        // total number of pages
  @Input() currentPageSize: number = 10;   // default page size
  @Input() pageSizes: number[] = [10, 20, 50];
  @Input() totalItems: number = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  goToFirstPage(){
    this.currentPageNumber = 1;
    this.pageChange.emit(this.currentPageNumber);
  }
  goToPreviousPage(){
    this.currentPageNumber--;
    this.pageChange.emit(this.currentPageNumber);
  }
  goToNextPage(){
    this.currentPageNumber++;
    this.pageChange.emit(this.currentPageNumber);
  }
  goToLastPage(){
    this.currentPageNumber = this.totalPages;
    this.pageChange.emit(this.currentPageNumber);
  }

  onPageSizeChange(newSize: string): void {
    const size = parseInt(newSize, 10);
    if (size !== this.currentPageSize) {
      this.pageSizeChange.emit(size);
    }
  }

}
