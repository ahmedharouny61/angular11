import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.css']
})
export class TrackOrderComponent implements OnInit {

 orders: any[] = [];
  loading: boolean = true;
  user: any = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      // Fetch using the Username
      this.fetchOrders(this.user.userName);
    }
  }


  fetchOrders(userName: string) {
    this.api.getOrdersByUser(userName).subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching orders:", err);
        this.loading = false;
      }
    });
  }

  // Helper to check Status (Case Insensitive)
  checkStatus(currentStatus: string, target: string): boolean {
    if (!currentStatus) return false;
    return currentStatus.toLowerCase() === target.toLowerCase();
  }

  // Logic for the Progress Bar Steps
  isShipped(status: string): boolean {
    // True if Shipped OR Delivered
    return this.checkStatus(status, 'Shipped') || this.checkStatus(status, 'Delivered');
  }

  isDelivered(status: string): boolean {
    return this.checkStatus(status, 'Delivered');
  }
}