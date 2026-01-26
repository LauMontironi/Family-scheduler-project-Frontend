import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Loginform {
  // ✅ backend en producción (Render)
  private readonly API = 'https://family-scheduler-project-backend.onrender.com';

  message = '';
  loading = false;

  inputType = signal<string>('password');

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private http: HttpClient, private router: Router) {}

  pulsarVerPassword() {
    this.inputType.update((val) => (val === 'password' ? 'text' : 'password'));
  }

  submit() {
    this.message = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.message = 'Revisa los campos.';
      return;
    }

    this.loading = true;
    const payload = this.form.getRawValue();

    this.http.post(`${this.API}/auth/login`, payload).subscribe({
      next: (res: any) => {
        console.log('LOGIN OK:', res);
        this.loading = false;

      
        if (res?.Token) localStorage.setItem('token', res.Token);
        if (res?.user?.full_name) localStorage.setItem('full_name', res.user.full_name);

        const goInside = window.confirm('Login correcto ✅\n\n¿Quieres entrar ahora?');

        if (goInside) {
          this.router.navigateByUrl('/welcome');
        }
      },
      error: (err) => {
        console.log('LOGIN ERROR:', err);
        this.message = err?.error?.detail ?? 'Error ❌ (mira consola)';
        this.loading = false;
      },
    });
  }
}
