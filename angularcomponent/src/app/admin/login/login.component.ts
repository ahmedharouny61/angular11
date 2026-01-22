import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any = {
    userName: '',
    password: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  onLogin() {
    this.http.post<any>("http://localhost:5107/api/user/login", this.loginObj)
      .subscribe({
        next: (res) => {
          alert(res.message);
          
          // 1. Save user to local storage (Critical for Profile & Auth Guards)
          localStorage.setItem('user', JSON.stringify(res.user));

          // 2. CHECK THE ROLE & REDIRECT
          // Note: API response properties often come back in camelCase (user.role) 
          // or PascalCase (User.Role) depending on your .NET settings. 
          // We check both just to be safe.
          const role = res.user?.role || res.User?.Role;

          if (role === 'Admin') {
            // If Admin -> Go to Dashboard
            this.router.navigate(['/admin/dashboard']);
          } else {
            // If Standard User -> Go to Shop
            this.router.navigate(['/shop/products']);
          }
        },
        error: (err) => {
          alert(err.error.message || "Login Failed");
        }
      });
  }
}

