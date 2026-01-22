import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{

signupObj: any = {
    userName: '',
    email: '',
    password: ''
  };
  constructor(private router: Router, private http: HttpClient) { }
onSignup() {
    // 3. Send the data to your .NET API
    this.http.post<any>("http://localhost:5107/api/user/signup", this.signupObj)
      .subscribe({
        next: (res) => {
          // Success: The backend said "User Registered Successfully!"
          alert(res.message);

          // ✅ THE FIX: Save the user data to Local Storage
          // We save 'this.signupObj' because it contains the name/email you just typed.
          localStorage.setItem('user', JSON.stringify(this.signupObj));

          this.router.navigate(['/login']);
        },
        error: (err) => {
          // Error handling
          alert(err.error.message || "Something went wrong");
        }
      });
  }
}
