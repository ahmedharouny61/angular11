import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http'; // 1. Import HTTP

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = [];
  public productList = new BehaviorSubject<any>([]);

  // 2. Inject HttpClient
  constructor(private http: HttpClient) { }

  // 1. Get all items currently in the cart
  getProducts() {
    return this.productList.asObservable();
  }

  // 2. Add a product to the cart
  addtoCart(product : any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  // 3. Calculate total price
getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      // Ensure quantity exists
      if (!a.quantity) { a.quantity = 1; }
      grandTotal += (a.price * a.quantity);
    });
    return grandTotal;
  }

  // 2. NEW: Method to increment quantity inside the Service
  addQuantity(item: any) {
    const product = this.cartItemList.find((p: any) => p.id === item.id);
    if (product) {
      if (!product.quantity) { product.quantity = 1; }
      product.quantity += 1;
      // Recalculate the item's total for display purposes
      product.total = (product.price * product.quantity).toFixed(2);
      
      // Notify components that list has changed
      this.productList.next(this.cartItemList);
    }
  }

  // 3. NEW: Method to decrement quantity inside the Service
  removeQuantity(item: any) {
    const product = this.cartItemList.find((p: any) => p.id === item.id);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      product.total = (product.price * product.quantity).toFixed(2);
      
      this.productList.next(this.cartItemList);
    }
  }

  // 4. Remove one item
  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  // 5. Clear entire cart
  removeAllCart(){
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  // 3. NEW: Send Order to Backend
  placeOrder(orderData: any) {
    return this.http.post("http://localhost:5107/api/order/place", orderData);
 
 
  }
  // Add this method to your CartService class
getMyOrders(userName: string) {
    return this.http.get<any>(`http://localhost:5107/api/order/user/${userName}`);
}
// Add this method inside your CartService class
updateCart(items: any[]) {
  // 1. Update the BehaviorSubject so other components (header) see changes
  this.productList.next(items); 
  
  // 2. Save to Local Storage
  localStorage.setItem('localCart', JSON.stringify(items));
  
  // 3. Recalculate total price (if you have a helper for that)
  this.getTotalPrice();
}
}