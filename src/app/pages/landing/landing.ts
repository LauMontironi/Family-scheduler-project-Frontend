import { Component, signal } from '@angular/core';
import { Registerform } from '../../components/registerform/registerform';
import { Loginform } from '../../components/login/login';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [Registerform, Loginform],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  showRegister = signal(false);
  showLogin = signal(false);

  openRegister() {
    this.showRegister.set(true);
    this.showLogin.set(false);
  }

  closeRegister() {
    this.showRegister.set(false);
  }

  openLogin() {
    this.showLogin.set(true);
    this.showRegister.set(false);
  }

  closeLogin() {
    this.showLogin.set(false);
  }
}


