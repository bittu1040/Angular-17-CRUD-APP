import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-route-demo',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './route-demo.component.html',
  styleUrl: './route-demo.component.scss',
})
export class RouteDemoComponent implements OnInit {
  ngOnInit(): void {}
}
