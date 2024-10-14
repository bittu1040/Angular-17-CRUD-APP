import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitConfigService {

  private users:any;
  constructor(private http: HttpClient) { }

  loadUsers():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      delay(5000),
      map((response)=>{
        this.users = response;
        console.log("users",this.users);
        return this.users
      })
    )
  }

  getUsers(){
    return this.users
  }
}


export function initializeApp(initConfigService: InitConfigService) {
  return () => {
    console.log('App initializer called');
    return initConfigService.loadUsers().toPromise().then(() => {
      console.log('App initializer completed');
    })
  };
}
