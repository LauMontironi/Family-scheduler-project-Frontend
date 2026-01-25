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

    this.http.post('http://localhost:8000/auth/register', payload).subscribe({
      next: (res) => {
        console.log('REGISTER OK:', res);
        this.loading = false;

        const go = window.confirm(
          'Usuario registrado correctamente 🎉\n\n¿Quieres entrar en tu cuenta ahora?'
        );

        if (go) {
          this.goToLogin.emit(); // 👈 AQUÍ ABRES LOGIN DESDE LANDING
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
