import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgFor, SlicePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch products from the service
    this.productService.getProducts().subscribe((data:any) => {
      this.products = data;
      this.filteredProducts = this.products;

      // Extract unique categories from the product list
      this.categories = [...new Set(this.products.map(product => product.category))];

      // Check if category query param exists and filter accordingly
      this.route.queryParams.subscribe(params => {
        const category = params['category'];
        if (category) {
          this.selectedCategory = category;
          this.filterProductsByCategory(category);
        }
      });
    });
  }

  onCategoryChange(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;

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
    if (category) {
      this.filteredProducts = this.products.filter(product => product.category === category);
    } else {
      this.filteredProducts = this.products;
    }
  }
}
