import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Loginform {
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

  constructor(private http: HttpClient) {}

  pulsarVerPassword() {
    this.inputType.update(val => (val === 'password' ? 'text' : 'password'));
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

    this.http.post('http://localhost:8000/auth/login', payload).subscribe({
      next: (res) => {
        console.log('LOGIN OK:', res);
        this.loading = false;

        const goInside = window.confirm(
          'Login correcto ✅\n\n¿Quieres entrar ahora?'
        );

        if (goInside) {
          console.log('Entrar (luego navegas a dashboard)');
          // Luego aquí haces router.navigate(['/dashboard']) o lo que toque
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
