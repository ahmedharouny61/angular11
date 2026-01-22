import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; // Make sure to import your API service

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
updateStock(_t27: any) {
throw new Error('Method not implemented.');
}

  products: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: (err) => {
        alert("Error fetching products");
      }
    });
  }
  
}