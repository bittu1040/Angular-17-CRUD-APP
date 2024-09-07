import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  private baseUrl: string = 'https://api.github.com/users/';

  constructor(private http: HttpClient) {}
  getGithubUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${username}`);
  }

  getUserRepos(username: string, perPage: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${username}/repos?per_page=${perPage}`);
  }

}
