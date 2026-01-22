import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { Product } from '../product.model'; // Make sure this path is correct

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Data
  products: Product[] = [];
  displayedProducts: Product[] = [];
  
  // Filters
  categories: string[] = [];
  companies: string[] = [];
  categoryCounts: { [key: string]: number } = {};

  // Active Filter State
  searchtext: string = '';
  selectedCategory: string = 'All';
  selectedCompany: string = 'All';

  constructor(
    private productService: ProductService, 
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.displayedProducts = data;

        // 1. AUTO-DETECT COMPANIES (Unique list)
        // This scans your data for "Samsung", "Apple", etc.
        this.companies = [...new Set(data.map(p => p.company))];

        // 2. AUTO-DETECT CATEGORIES
        this.categories = [...new Set(data.map(p => p.category))];

        // 3. Count items for the Category Bubbles
        this.categories.forEach(cat => {
          this.categoryCounts[cat] = this.products.filter(p => p.category === cat).length;
        });
      },
      error: (err) => console.error(err)
    });
  }

  // --- MASTER FILTER FUNCTION ---
  applyFilters() {
    this.displayedProducts = this.products.filter(item => {
      
      // 1. Check Search
      const matchSearch = this.searchtext === '' || 
                          item.name.toLowerCase().includes(this.searchtext.toLowerCase());

      // 2. Check Category
      const matchCategory = this.selectedCategory === 'All' || 
                            item.category === this.selectedCategory;

      // 3. Check Company
      const matchCompany = this.selectedCompany === 'All' || 
                           item.company === this.selectedCompany;

      return matchSearch && matchCategory && matchCompany;
    });
  }

  // --- EVENT HANDLERS ---
  onSearchTextEntered(searchValue: string) {
    this.searchtext = searchValue;
    this.applyFilters();
  }

  onCategorySelected(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onCompanySelected(company: string) {
    this.selectedCompany = company;
    this.applyFilters();
  }

// Inside ProductsComponent class

addtocart(item: any) {
  // 1. SECURITY CHECK: Stop if no stock
  if (!item.stock || item.stock <= 0) {
    alert("Sorry, this item is currently out of stock.");
    return; // <--- This stops the function immediately
  }

  this.cartService.addtoCart(item);
  alert("Item added to cart!");
}

buynow(item: any) {
  // 1. SECURITY CHECK
  if (!item.stock || item.stock <= 0) {
    alert("Sorry, this item is out of stock.");
    return;
  }

  this.cartService.removeAllCart();
  this.cartService.addtoCart(item);
  this.router.navigate(['/payment']);
}
}