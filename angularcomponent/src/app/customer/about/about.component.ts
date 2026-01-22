import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
navigateToProducts() {
    this.router.navigate(['/shop/products']);
  }
  navigateToHome() {
    this.router.navigate(['/shop/products']);
  }
  navigateToAbout() {
    this.router.navigate(['/about']);

  }
  navigateToContact() {
    this.router.navigate(['/shop/contact']);
  }
  navigateToCart() {
    this.router.navigate(['/shop/cart']);
  }
  navigateToorders() {
    this.router.navigate(['/shop/track-order']);
  }
}
