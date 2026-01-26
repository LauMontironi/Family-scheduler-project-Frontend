import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomePage {
  
  fullName = localStorage.getItem('full_name') ?? 'Usuario';

  private router = inject(Router);

  goCreateFamily() {
    this.router.navigateByUrl('/families/create');
  }

  goMyFamilies() {
    this.router.navigateByUrl('/families');
  }
}
