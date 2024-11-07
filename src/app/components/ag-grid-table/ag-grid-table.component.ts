import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './ag-grid-table.component.html',
  styleUrl: './ag-grid-table.component.scss'
})
export class AgGridTableComponent {
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;


  public columnDefs: ColDef[] = [
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price' },
    { field: 'year' },
    { field: 'color' }
  ];
  public rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, year: 2019, color: 'Red' },
    { make: 'Ford', model: 'Mondeo', price: 32000, year: 2018, color: 'Blue' },
    { make: 'Porsche', model: 'Boxster', price: 72000, year: 2020, color: 'Black' },
    { make: 'Toyota', model: 'Camry', price: 30000, year: 2017, color: 'White' },
    { make: 'Honda', model: 'Civic', price: 27000, year: 2019, color: 'Silver' },
    { make: 'BMW', model: '5 Series', price: 55000, year: 2021, color: 'Blue' },
    { make: 'Mercedes', model: 'E-Class', price: 60000, year: 2020, color: 'Gray' },
    { make: 'Audi', model: 'A4', price: 40000, year: 2018, color: 'Black' },
    { make: 'Chevrolet', model: 'Malibu', price: 25000, year: 2017, color: 'Red' },
    { make: 'Hyundai', model: 'Elantra', price: 22000, year: 2019, color: 'Blue' },
    { make: 'Kia', model: 'Optima', price: 24000, year: 2020, color: 'White' },
    { make: 'Volkswagen', model: 'Passat', price: 26000, year: 2021, color: 'Silver' },
    { make: 'Mazda', model: '6', price: 23000, year: 2018, color: 'Red' },
    { make: 'Subaru', model: 'Legacy', price: 28000, year: 2020, color: 'Gray' },
    { make: 'Nissan', model: 'Altima', price: 29000, year: 2021, color: 'Black' },
    { make: 'Lexus', model: 'ES', price: 45000, year: 2019, color: 'Blue' },
    { make: 'Infiniti', model: 'Q50', price: 42000, year: 2018, color: 'White' },
    { make: 'Tesla', model: 'Model S', price: 80000, year: 2021, color: 'Black' },
    { make: 'Jaguar', model: 'XF', price: 70000, year: 2020, color: 'Gray' },
    { make: 'Acura', model: 'TLX', price: 38000, year: 2017, color: 'Silver' },
    { make: 'Cadillac', model: 'CTS', price: 67000, year: 2021, color: 'Blue' },
    { make: 'Lincoln', model: 'MKZ', price: 55000, year: 2019, color: 'White' },
    { make: 'Buick', model: 'LaCrosse', price: 33000, year: 2018, color: 'Black' },
    { make: 'Chrysler', model: '300', price: 35000, year: 2020, color: 'Red' },
    { make: 'Volvo', model: 'S60', price: 48000, year: 2021, color: 'Blue' },
    { make: 'Genesis', model: 'G80', price: 52000, year: 2019, color: 'Gray' },
    { make: 'Mitsubishi', model: 'Lancer', price: 21000, year: 2017, color: 'Silver' },
    { make: 'Alfa Romeo', model: 'Giulia', price: 74000, year: 2020, color: 'White' },
    { make: 'Mini', model: 'Cooper', price: 25000, year: 2021, color: 'Red' },
    { make: 'Fiat', model: '500', price: 18000, year: 2018, color: 'Blue' }
  ];
  


  constructor(private http: HttpClient) {

  }


  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.post<any>('https://fakestoreapi.com/products', {
      page: this.currentPage,
      pageSize: this.pageSize
    }).subscribe(response => {
      this.rowData = response.items;
      this.totalItems = response.total;
    });
  }

  onPaginationChanged(event: any) {
    this.currentPage = event.newPage;
    this.fetchData();
  }

  paginationNumberFormatter(params: any) {
    return `${params.value.toLocaleString()}`;
  }
}
