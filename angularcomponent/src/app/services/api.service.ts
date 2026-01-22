import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Pointing to your ASP.NET Core API
  private baseUrl = 'http://localhost:5107/api';

  constructor(private http: HttpClient) { }

  // ============================
  // 1. PRODUCT METHODS
  // ============================
  
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  // ============================
  // 2. ORDER METHODS
  // ============================

  // Used by Payment Page
  placeOrder(orderData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Order/place`, orderData);
  }

  // Used by Track Order Page
  // (I merged your two duplicate methods into this one)
  getOrdersByUser(userName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Order/user/${userName}`);
  }

  // ============================
  // 3. USER METHODS
  // ============================

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User`);
  }

  // Create User (Used by Admin 'Add User' and Signup)
  createUser(userObj: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/signup`, userObj);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/User/${id}`);
  }
  // Add this inside your ApiService class
// Make sure this is inside the class ApiService
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, product);
  }
  // Inside ApiService class

// Promote User
promoteUser(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/User/promote/${id}`, {});
}

// Demote User
demoteUser(id: number): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/User/demote/${id}`, {});
}
}