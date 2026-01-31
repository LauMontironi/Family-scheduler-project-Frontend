import { Registerform } from './../../components/registerform/registerform';
import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Registerform],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css'
})
export class LayoutShell {

  private router = inject(Router);

  showRegister = signal(false);
  showBackHome = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.showBackHome.set(e.urlAfterRedirects !== '/');
      });
  }

  goHome() {
    this.router.navigateByUrl('/');
  }

  openRegister() {
    this.showRegister.set(true);
  }

  openLogin() {
    this.showRegister.set(false);
  }
}
