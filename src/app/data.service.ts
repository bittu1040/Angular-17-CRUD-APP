import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private fakeApiUrl = 'https://jsonplaceholder.typicode.com';
  private jsonServerUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get(`${this.fakeApiUrl}/posts`);
  }

  createItem(item: any) {
    return this.http.post(`${this.fakeApiUrl}/posts`, item);
  }

  updateItem(item: any) {
    return this.http.put(`${this.fakeApiUrl}/posts`+ '/' + item.id, item);
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.fakeApiUrl}/posts/${itemId}`);
  }

  getEmpDetails(){
    return this.http.get(`${this.jsonServerUrl}/empDetails`)
  }

  deleteEmp(id:number){
    return this.http.delete(`${this.jsonServerUrl}/empDetails` + "/"+  id)
  }

  addEmpDetails(details: any){
    let httpheaders=new HttpHeaders()
    .set('Content-type','application/Json');
    let options={
      headers:httpheaders
    };
    return this.http.post(`${this.jsonServerUrl}/empDetails`, details, options)
  }

  editUserDetails(id: any, user: any){
    return this.http.put(`${this.jsonServerUrl}/empDetails` + "/" + id, user)
  }
}
