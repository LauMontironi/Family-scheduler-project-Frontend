import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registerform.html',
  styleUrl: './registerform.css',
})
export class Registerform {
  @Output() goToLogin = new EventEmitter<void>();

  // ✅ URL del backend en producción (Render)
  // (si luego quieres, esto lo movemos a environment)
  private readonly API = 'https://family-scheduler-project-backend.onrender.com';

  message = '';
  loading = false;
  inputType = signal<string>('password');

  form = new FormGroup({
    full_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  constructor(private http: HttpClient) {}

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

    // ✅ ya no localhost:8000 — ahora Render
    this.http.post(`${this.API}/auth/register`, payload).subscribe({
      next: (res) => {
        console.log('REGISTER OK:', res);
        this.loading = false;

        const go = window.confirm(
          'Usuario registrado correctamente 🎉\n\n¿Quieres entrar en tu cuenta ahora?'
        );

        if (go) {
          this.goToLogin.emit(); // abre login desde landing
        } else {
          this.form.reset();
        }
      },
      error: (err) => {
        console.log('REGISTER ERROR:', err);
        this.message = err?.error?.detail ?? 'Error ❌ (mira consola)';
        this.loading = false;
      },
    });
  }
}
