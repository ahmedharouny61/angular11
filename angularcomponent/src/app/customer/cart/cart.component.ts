import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any[] = [];
  grandTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;

      // Initialize quantity and total for each item if they don't exist
      this.products.forEach((a: any) => {
        // If quantity is missing, set to 1
        if (!a.quantity) { a.quantity = 1; }
        
        // Calculate initial total for the row
        // We use Math.round or similar logic to avoid long decimals, or just keep as number
        a.total = (a.price * a.quantity); 
      });

      this.calculateGrandTotal();
    });
  }

  // --- ACTIONS ---

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    // Removing an item automatically triggers the subscribe in ngOnInit, 
    // so the list updates itself.
  }

  emptycart() {
    this.cartService.removeAllCart();
  }

  checkout() {
    // Logic: Don't go to payment if cart is empty
    if (this.grandTotal === 0) {
      alert("Your cart is empty!");
      return;
    }
    this.router.navigate(['/payment']);
  }

  // --- QUANTITY LOGIC ---

  increase(item: any) {
    // 1. SECURITY CHECK: Check stock
    if (item.quantity >= item.stock) {
      alert(`Sorry, you cannot add more. Only ${item.stock} items left in stock.`);
      return; 
    }

    // 2. Increase Quantity
    item.quantity++;
    
    // 3. Update the Row Total (for the UI table)
    item.total = item.price * item.quantity;

    // 4. Update Service (Pass the WHOLE list so it saves correctly)
    this.cartService.updateCart(this.products);
    
    // 5. Recalculate Grand Total
    this.calculateGrandTotal();
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      
      // Update Row Total
      item.total = item.price * item.quantity;

      // Update Service
      this.cartService.updateCart(this.products);
      
      // Recalculate Grand Total
      this.calculateGrandTotal();
    }
  }

  // --- HELPER ---

  calculateGrandTotal() {
    // Recalculate based on current quantities in the this.products array
    this.grandTotal = 0;
    this.products.map((a: any) => {
      this.grandTotal += (a.price * a.quantity);
    });
  }

}