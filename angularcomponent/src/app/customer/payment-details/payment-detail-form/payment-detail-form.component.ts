import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Fixed: Added Import

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent implements OnInit {
  
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  stripeForm: FormGroup;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': { color: '#1eb37a' } 
      }
    }
  };

  elementsOptions: StripeElementsOptions = { locale: 'en' };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private http: HttpClient,
    public cartService: CartService,
    private router: Router,
    private api: ApiService 
  ) {
    this.stripeForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  pay(): void {
    if (this.stripeForm.valid) {
      // 1. Create Payment Intent
      this.http.post<{ clientSecret: string }>('http://localhost:5107/api/payments/create-payment-intent', { 
        amount: this.cartService.getTotalPrice() 
      })
      .subscribe({
        next: (res) => {
          // 2. Confirm Payment with Stripe
          this.stripeService.confirmCardPayment(res.clientSecret, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: this.stripeForm.get('name')?.value,
              },
            },
          }).subscribe((result) => {
            if (result.error) {
              alert(result.error.message);
            } else {
              // 3. Payment Succeeded? Save the Order.
              if (result.paymentIntent?.status === 'succeeded') {
                
                const orderData = {
                    customerName: this.stripeForm.get('name')?.value,
                    totalAmount: this.cartService.getTotalPrice(),
                    items: this.cartService.cartItemList.map((item: any) => ({
                        productId: item.id,
                        productName: item.name,
                        image: item.image,
                        price: item.price,
                        quantity: item.quantity
                    }))
                };

                // Send to Backend
                this.api.placeOrder(orderData).subscribe({
                    next: () => {
                        alert('Payment Successful & Order Placed!');
                        this.cartService.removeAllCart();
                        this.router.navigate(['/shop/track-order']); 
                    },
                    error: (err) => {
                        console.error("Order Save Failed:", err); // Check Console for red errors
                        alert('Payment succeeded but order save failed. Check console.');
                    }
                });
              }
            }
          });
        },
        error: (err) => {
          console.error(err);
          alert('Error connecting to Payment Server');
        }
      });
    } else {
      alert("Please enter your name");
    }
  }
//  placeOrder() {
//      this.cartService.removeAllCart();
//      this.router.navigate(['/shop/products']);
//   }
}

 
