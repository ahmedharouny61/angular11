import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Admin'] // Hardcoded role
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      // Assuming your Signup API can take a 'role' parameter
      // If your standard signup doesn't support roles, you might need a special endpoint like /api/admin/create
      this.http.post<any>("http://localhost:5107/api/user/signup", this.adminForm.value)
        .subscribe({
          next: (res) => {
            alert('Admin Account Created Successfully!');
            this.router.navigate(['/login']); // Or redirect to Admin Dashboard
          },
          error: (err) => {
            alert(err.error.message || 'Failed to create admin');
          }
        });
    }
  }
}