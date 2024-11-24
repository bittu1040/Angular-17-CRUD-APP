import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  id?: number;
  title: string;
  body: string;
  userId: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API

  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number): Observable<PaginatedResponse<Post>> {
    const startIndex = (page - 1) * pageSize;
    return this.http.get<Post[]>(this.apiUrl).pipe(
      map(posts => ({
        data: posts.slice(startIndex, startIndex + pageSize),
        total: posts.length,
        page,
        pageSize
      }))
    );
  }
}
