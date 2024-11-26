import { Component } from '@angular/core';

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

}
