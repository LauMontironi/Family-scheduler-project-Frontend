import { Registerform } from './../../components/registerform/registerform';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Registerform],
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.css'
})
export class LayoutShell {

    showRegister = signal(false);
  




openRegister() {
    this.showRegister.set(true);
  }
  
  
  
  
openLogin() {
    this.showRegister.set(false);
    // aquí luego muestras login o navegas a /login
  }
}
