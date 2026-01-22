import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../customer/product.model';  // Import the interface

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // IMPORTANT: Replace with your actual ASP.NET Core URL (check launchSettings.json)
  // Example: https://localhost:7001/api/products
  private url = 'http://localhost:5107/api/products'; 

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
}