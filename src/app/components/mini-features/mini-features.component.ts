import { Component } from '@angular/core';
import { CheckUsernameUniqueComponent } from '../../mini-features/check-username-unique/check-username-unique.component';
import { DateTimeDemoComponent } from '../../mini-features/date-time-demo/date-time-demo.component';
import { PaginationUIComponent } from "../../mini-features/pagination-ui/pagination-ui.component";
import { PaginationNgComponent, PaginationNgService } from '@bittu1040/pagination-ng';
import { AutocompleteComponent } from '../../mini-features/autocomplete/autocomplete.component';

@Component({
  selector: 'app-mini-features',
  standalone: true,
  imports: [CheckUsernameUniqueComponent, DateTimeDemoComponent, PaginationUIComponent, PaginationNgComponent, AutocompleteComponent],
  templateUrl: './mini-features.component.html',
  styleUrl: './mini-features.component.scss'
})
export class MiniFeaturesComponent {

  pageNumber: number = 1;
  totalPages: number = 10;
  currentPageSize: number = 20;  // choose a default page size from the pageSizes array
  pageSizes: number[] = [20, 50, 100];
  totalItems: number = 200;


  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    console.log(`Page changed to: ${this.pageNumber}`);
    // Add logic to fetch data for the new page
  }

  onPageSizeUpdate(newPageSize: number): void {
    this.currentPageSize = newPageSize;
    console.log(`Page size updated to: ${this.currentPageSize}`);
    // Add logic to update the page size and refresh data
  }
}
