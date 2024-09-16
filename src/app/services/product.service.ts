// eslint-disable-next-line
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = 'https://fakestoreapi.com/';


  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.baseUrl}products`);
  }
// eslint-disable-next-line
  getProductById(id: any) {
    return this.http.get(`${this.baseUrl}products/${id}`);
  }

}
