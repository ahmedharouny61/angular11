import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  // 2. Inject Router as 'public' so HTML can use it
  constructor(public router: Router) { } 

  ngOnInit(): void {
  }
}