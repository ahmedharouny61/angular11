import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // 1. Import Router
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
sitename="e-shoping";
isMenuOpen = false;
  triggerAnimation = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    // 3. Listen for every page change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.replayAnimation();
    });
  }
toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 4. Helper to reset the animation
  replayAnimation() {
    this.triggerAnimation = false; // Turn off
    setTimeout(() => {
      this.triggerAnimation = true; // Turn on (after tiny delay)
    }, 10);
  }
}
