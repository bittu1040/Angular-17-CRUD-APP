import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://api.github.com/users/';

  constructor(private http: HttpClient) { }

  checkUsernameUniqueness(username: string): Observable<boolean> {
    return this.http.get(`${this.apiUrl}${username}`).pipe(
      map(() => false), // Username exists on GitHub
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(true); // Username is available
        }
        return of(false); // Treat any other error as "username taken"
      })
    );
  }
}
