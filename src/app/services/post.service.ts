import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export interface Pagination {
  pageNumber: number;
  totalData: number;
  totalPages: number;
  perPageData: number;
}

export interface PaginatedResponse<T> {
  pagination: Pagination;
  data: T[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(pageNumber: number, pageSize: number): Observable<PaginatedResponse<Post>> {
    return this.http.get<Post[]>(`${this.apiUrl}`, {
      params: {
        page: pageNumber.toString(),
        per_page: pageSize.toString()
      }
    }).pipe(
      map(response => ({
        pagination: {
          pageNumber: pageNumber,
          totalData: 100, // Replace with actual total from API
          totalPages: 10, // Replace with actual total pages from API
          perPageData: pageSize
        },
        data: response
      }))
    );
    
  }
}
