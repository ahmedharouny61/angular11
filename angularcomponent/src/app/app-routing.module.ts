import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// --- IMPORTS ---
import { LoginComponent } from './admin/login/login.component';
import { SignupComponent } from './admin/signup/signup.component';

// Containers (Layouts)
import { ContainerComponent } from './customer/container/container.component'; 
import { Container2Component } from './customer/container2/container2.component';

// Components
import { ProductsComponent } from './customer/products/products.component';
import { CartComponent } from './customer/cart/cart.component';
import { PaymentDetailsComponent } from './customer/payment-details/payment-details.component';
import { TrackOrderComponent } from './customer/track-order/track-order.component';
import { ContactComponent } from './customer/contact/contact.component';
import { AboutComponent } from './customer/about/about.component';
import { ProfileComponent } from './customer/profile/profile.component';

// Admin Components
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

export const routes: Routes = [
  // 1. DEFAULT REDIRECT
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // 2. AUTH PAGES (No Wrapper)
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'payment', component: PaymentDetailsComponent }, // Usually standalone

  // 3. ADMIN AREA
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  },

  // 4. MAIN SHOP (Container 1) -> /shop
  {
    path: 'shop',
    component: ContainerComponent, // Uses Standard Layout
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', component: ProductsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'track-order', component: TrackOrderComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'about', component: AboutComponent },

    ]
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }