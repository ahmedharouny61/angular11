import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ContainerComponent } from './customer/container/container.component';
import { NavComponent } from './customer/nav/nav.component';
import { HeaderComponent } from './customer/header/header.component';
import { SearchComponent } from './customer/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './customer/products/products.component';
import { FilterComponent } from './customer/filter/filter.component';
import { ImageRadioDemoComponent } from './customer/image-radio-demo/image-radio-demo.component';
import { LoginComponent } from './admin/login/login.component';
import { CartComponent } from './customer/cart/cart.component';
import { CustomerComponent } from './admin/customer/customer.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { AppRoutingModule } from './app-routing.module';
import { PaymentDetailsComponent } from './customer/payment-details/payment-details.component';
import { PaymentDetailFormComponent } from './customer/payment-details/payment-detail-form/payment-detail-form.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './admin/signup/signup.component';
import { StripeCardComponent } from 'ngx-stripe';
import { NgxStripeModule } from 'ngx-stripe';
import { TrackOrderComponent } from './customer/track-order/track-order.component';
import { WelcomerComponent } from './customer/welcomer/welcomer.component';
import { ContactComponent } from './customer/contact/contact.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './customer/profile/profile.component';
import { CreateAdminComponent } from './admin/create-admin/create-admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { CommonModule } from '@angular/common';
import { Container2Component } from './customer/container2/container2.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    NavComponent,
    HeaderComponent,
    SearchComponent,
    ProductsComponent,
    FilterComponent,
    ImageRadioDemoComponent,
    LoginComponent,
    CartComponent,
    CustomerComponent,
    OrdersComponent,
    PaymentDetailsComponent,
    PaymentDetailFormComponent,
    SignupComponent,
    PaymentDetailFormComponent,
    TrackOrderComponent,
    WelcomerComponent,
    ContactComponent,
    ProfileComponent,
    CreateAdminComponent,
    AdminDashboardComponent,
    AdminUsersComponent,
    Container2Component,
    
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
     NgxStripeModule.forRoot('pk_test_51SjF5ZRZ8egC5XoIUWf7CK1jQI4XUt8ZDRSePuuDSmUiAcIhXgQg2fOmWJ5KC1mAPQeOzBPU9OdnQkM3QoI6szAI00urnK1IKP')
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
