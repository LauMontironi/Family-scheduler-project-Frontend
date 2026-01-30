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
  private readonly API = 'https://family-scheduler-project-backend.onrender.com';

  message = '';
  loading = false;

  inputType = signal<string>('password');

  form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/),
      ],
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

    // ✅ payload limpio (sin espacios)
    const payload = {
      email: (this.form.value.email ?? '').trim(),
      password: (this.form.value.password ?? '').trim(),
    };

    console.log('PAYLOAD LOGIN:', payload);

    this.http.post(`${this.API}/auth/login`, payload).subscribe({
      next: (res: any) => {
        console.log('LOGIN OK:', res);
        this.loading = false;

        // ✅ TU BACKEND DEVUELVE "Token" (MAYÚSCULA)
        const token = res?.Token;

        if (!token) {
          console.error('NO LLEGÓ Token EN LA RESPUESTA');
          this.message = 'Error: no llegó el token del backend.';
          return;
        }

        // ✅ guardar token y nombre
        localStorage.setItem('access_token', token);

        const fullName = res?.user?.full_name ?? 'Usuario';
        localStorage.setItem('full_name', fullName);

        console.log('TOKEN GUARDADO:', localStorage.getItem('access_token'));

        // ✅ entrar
        this.router.navigateByUrl('/welcome');
      },
      error: (err) => {
        console.log('LOGIN ERROR:', err);
        this.message = err?.error?.detail ?? 'Error ❌ (mira consola)';
        this.loading = false;
      },
    });
  }
}
