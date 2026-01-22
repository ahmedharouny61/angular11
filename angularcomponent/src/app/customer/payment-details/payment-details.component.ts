import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { CartService } from 'src/app/services/cart.service'; // Import this
import { Router } from '@angular/router'; // Import this
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})

export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService,private router: Router,private cartService: CartService, 
    private cart: CartService,private api: ApiService,) { }
totalAmount: number = 0;
  cartItems: any[] = [];
  user: any = {};
ngOnInit(): void {
    // 1. Get User Data
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }

    // 2. Get Cart Items
    this.cart.getProducts().subscribe(res => {
      this.cartItems = res;
      this.totalAmount = this.cart.getTotalPrice();
    });
  }

  // Allow user to edit a card by clicking it
  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  // Delete a card
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.refreshList();
            alert("Deleted successfully");
          },
          error: err => { console.log(err); }
        })
    }
  }
  onPay() {
    // A. PREPARE THE ORDER OBJECT (Fixed to match your C# Model)
    const orderObj = {
      // Your Backend uses 'CustomerName', not 'UserId'
      CustomerName: this.user.userName || this.user.UserName, 
      
      TotalAmount: this.totalAmount,
      
      // Your Backend uses 'Items', not 'orderItems'
      Items: this.cartItems.map(item => ({
        ProductId: item.id,
        ProductName: item.title || item.name, // Handle different property names
        Price: item.price,
        Quantity: item.quantity || 1
      }))
    };

    // Debug: Check the console to see what we are sending
    console.log("Sending Order:", orderObj);

    // B. SEND TO BACKEND
    this.api.placeOrder(orderObj).subscribe({
      next: (res) => {
        alert("Payment Successful! Order Placed.");
        
        // C. CLEAR THE CART (This fixes the "Can't place new order" issue)
        this.cart.removeAllCart(); 
        
        // D. Redirect to products
        this.router.navigate(['/shop/products']);
      },
      error: (err) => {
        alert("Payment succeeded but Order failed to save.");
        console.error("Backend Error:", err);
      }
    });
  }
}