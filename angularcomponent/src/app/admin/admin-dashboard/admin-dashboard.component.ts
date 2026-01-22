import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

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
  } // <--- getProducts closes here

  // ✅ updateStock must be HERE (Between functions)
  updateStock(product: any) {
    const id = product.id || product.Id;

    if (!id) {
      alert("Error: Product ID is missing.");
      return;
    }

    const newStockValue = Number(product.stock || product.Stock);
    
    const updatePayload = {
      ...product,           
      Id: id,               
      id: id,               
      Stock: newStockValue, 
      stock: newStockValue  
    };

    console.log("Sending Update:", updatePayload); 

    this.api.updateProduct(id, updatePayload).subscribe({
      next: (res) => {
        alert("Success! Stock updated to " + newStockValue);
      },
      error: (err) => {
        console.error("API Error Details:", err);
        alert("Failed update.");
      }
    });
  } // <--- updateStock closes here

} // <--- FINAL CLASS CLOSING BRACE (Make sure this is at the very end)