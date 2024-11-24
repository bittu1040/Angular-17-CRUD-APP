import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { PostService, Post, PaginatedResponse } from '../../services/post.service';
import { CustomPaginationComponent } from '../custom-pagination/custom-pagination.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ag-grid-table',
  standalone: true,
  imports: [AgGridModule, CustomPaginationComponent, NgIf],
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.scss']
})
export class AgGridTableComponent implements OnInit {
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;
  totalPages = 0;
  rowData: Post[] = [];
  loading = false;

  gridOptions: GridOptions = {
    pagination: false,
    suppressPaginationPanel: true,
    rowHeight: 50,
    defaultColDef: {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true
    },
    onFilterChanged: this.onFilterChanged.bind(this)
  };

  public columnDefs: ColDef[] = [
    { 
      field: 'id',
      headerName: 'ID',
      width: 100,
      filter: 'agNumberColumnFilter',
      floatingFilter: true
    },
    { 
      field: 'userId',
      headerName: 'User ID',
      width: 120,
      filter: 'agNumberColumnFilter',
      floatingFilter: true
    },
    { 
      field: 'title',
      headerName: 'Title',
      flex: 1,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="cell-wrap-text">${params.value}</div>`;
      }
    },
    { 
      field: 'body',
      headerName: 'Content',
      flex: 2,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      cellRenderer: (params: ICellRendererParams) => {
        return `<div class="cell-wrap-text">${params.value}</div>`;
      }
    }
  ];

  private gridApi: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.loadPage();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  onPageChange(page: number) {
    console.log('onPageChange', page);
    this.currentPage = page;
    this.loadPage();
  }

  onPageSizeChange(newSize: number) {
    console.log('onPageSizeChange', newSize);
    this.pageSize = newSize;
    this.currentPage = 1;
    this.loadPage();
  }

  onFilterChanged() {
    const filterModel = this.gridApi.getFilterModel();
    console.log('Filter Model:', filterModel);
  }

  private loadPage() {
    this.loading = true;
    this.postService.getPosts(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PaginatedResponse<Post>) => {
          console.log('Response:', response);
          this.rowData = response.data;
          this.totalItems = response.pagination.totalData;
          this.totalPages = response.pagination.totalPages;
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading posts:', error);
          this.loading = false;
        }
      });
  }
}
