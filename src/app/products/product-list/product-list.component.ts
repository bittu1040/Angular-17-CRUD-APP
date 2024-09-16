/* eslint-disable */
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, SlicePipe, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';  // Default to 'all'

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch products from the service
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      this.filteredProducts = this.products;

      // Extract unique categories from the product list
      this.categories = [...new Set(this.products.map(product => product.category))];

      // Check if category query param exists and filter accordingly
      this.route.queryParams.subscribe(params => {
        console.log(params);
        const category = params['category'] || 'all'; // Default to 'all' if not provided
        this.selectedCategory = category;
        this.filterProductsByCategory(category);
      });
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value || 'all';

    // Update query params in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: selectedCategory },
      queryParamsHandling: 'merge' // Merge with other query params if any
    });

    // Filter products based on selected category
    this.filterProductsByCategory(selectedCategory);
  }

  filterProductsByCategory(category: string): void {
    if (category === 'all') {
      this.filteredProducts = this.products; // Show all products
    } else {
      this.filteredProducts = this.products.filter(product => product.category === category);
    }
  }
}
