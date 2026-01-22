import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // 1. Import Forms

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];
  showAddForm: boolean = false; // Toggle for the form
  addUserForm!: FormGroup;      // The form variable

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadUsers();
    this.getUsers();
    // 2. Initialize the form
    this.addUserForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['User'] // Default role
    });
  }

  loadUsers() {
    this.api.getUsers().subscribe(res => this.users = res);
  }

  // 3. Logic to Create User
  addUser() {
    if(this.addUserForm.valid) {
      // Reuse the 'signUp' API since it creates users
      this.api.createUser(this.addUserForm.value).subscribe({
        next: (res) => {
          alert("User Added Successfully!");
          this.showAddForm = false; // Hide form
          this.addUserForm.reset({ role: 'User' }); // Reset form
          this.loadUsers(); // Refresh list
        },
        error: (err) => {
          alert("Failed to add user. Username might exist.");
        }
      });
    }
  }
  getUsers() {
    this.api.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err) => {
        alert("Error fetching users");
      }
    });
  }
// --- PROMOTE LOGIC ---
  promote(user: any) {
    if(confirm(`Are you sure you want to promote ${user.name || user.userName} to Admin?`)) {
      this.api.promoteUser(user.id).subscribe({
        next: (res) => {
          alert(res.Message || "User promoted!");
          this.getUsers(); // Refresh list to see change
        },
        error: (err) => alert("Failed to promote user.")
      });
    }
  }

  // --- DEMOTE LOGIC ---
  demote(user: any) {
    if(confirm(`Are you sure you want to demote ${user.name || user.userName} back to User?`)) {
      this.api.demoteUser(user.id).subscribe({
        next: (res) => {
          alert(res.Message || "User demoted!");
          this.getUsers(); // Refresh list
        },
        error: (err) => alert("Failed to demote user.")
      });
    }
  }
 deleteUser(id: number) {
    // 1. Debug: Check if we actually have an ID
    console.log("Attempting to delete User ID:", id);

    if (!id) {
        alert("Error: User ID is undefined!");
        return;
    }

    if(confirm('Are you sure you want to delete this user?')) {
      this.api.deleteUser(id).subscribe({
        next: (res) => {
          alert("User Deleted Successfully");
          this.loadUsers();
        },
        error: (err) => {
          // 2. Debug: Log the actual error from the backend
          console.error("Delete Failed:", err);
          alert(err.error.message || "Failed to delete user. Check console for details.");
        }
      });
    }
  }
}