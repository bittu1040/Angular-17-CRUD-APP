import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor, SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, SlicePipe, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productService= inject(ProductService);
  products:any;
  constructor() { }
 
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data:any) => {
        console.log(data);
        this.products = data;
      },
      error: (error:any) => console.log(error),
    })
  }
}
