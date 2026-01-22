import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service'; // 1. Import ApiService

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // User Data
  user = {
    name: 'Youssef Ahmed',
    email: 'youssef@example.com',
    joinDate: 'January 2024'
  };

  cartCount: number = 0;
  totalOrders: number = 0; // 2. New variable for Order Count

  // Variables for Editing
  isEditing: boolean = false;
  profileForm!: FormGroup;

  // 3. Inject ApiService
  constructor(
    private router: Router, 
    private cartService: CartService,
    private fb: FormBuilder,
    private api: ApiService 
  ) { }

  ngOnInit(): void {
    // --- 1. RETRIEVE USER DATA ---
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      
      // Map 'userName' or 'name' from local storage
      this.user.name = parsedUser.userName || parsedUser.name || this.user.name;
      this.user.email = parsedUser.email || this.user.email;

      // 4. Fetch Real Orders for this user using the API
      // We use the name found in local storage to find their orders
      if (this.user.name) {
        this.getRealOrderCount(this.user.name);
      }
    }

    // --- 2. Get Cart Count ---
    this.cartService.getProducts().subscribe((res: any) => {
      this.cartCount = res.length;
    });

    // --- 3. Initialize Form ---
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });
  }

  // --- 5. New Function to Fetch Order Count ---
  getRealOrderCount(userName: string) {
    this.api.getOrdersByUser(userName).subscribe({
      next: (res: any[]) => {
        this.totalOrders = res.length; // Set the count dynamically
      },
      error: (err) => {
        console.error("Error fetching orders:", err);
        this.totalOrders = 0; // Default to 0 on error
      }
    });
  }

  // --- Toggle Edit Mode ---
  toggleEdit() {
    this.isEditing = !this.isEditing;
    
    if (this.isEditing) {
      this.profileForm.patchValue({
        name: this.user.name,
        email: this.user.email
      });
    }
  }

  // --- Save Changes ---
  saveProfile() {
    if (this.profileForm.valid) {
      // Update local user object
      this.user.name = this.profileForm.value.name;
      this.user.email = this.profileForm.value.email;
      
      // Update LocalStorage so changes persist on refresh
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          const parsed = JSON.parse(storedUser);
          parsed.userName = this.user.name; // Update name in storage
          parsed.email = this.user.email;
          localStorage.setItem('user', JSON.stringify(parsed));
      }

      this.isEditing = false;
      alert("Profile Updated Successfully!");
    }
  }

  logout() {
    // Clear user data
    localStorage.removeItem('user');
    alert('Logged out successfully');
    this.router.navigate(['/login']);
  }
}