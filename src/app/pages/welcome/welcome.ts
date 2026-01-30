import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FamilyDataApi } from '../../services/family-data.api';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class WelcomePage {


  fullName = localStorage.getItem('full_name') ?? 'Usuario';

  private router = inject(Router);
  private api = inject(FamilyDataApi);

  // ✅ STRING NORMAL
  familyName: string = '';

  goMyFamilies() {
    this.router.navigateByUrl('/family');
  }

  createFamily() {
    if (!this.familyName.trim()) {
      console.log('TOKEN EN WELCOME:', localStorage.getItem('access_token'));
      alert('Escribe un apellido para la familia');
      return;
    }

    const payload = {
      family_name: `Familia ${this.familyName.trim()}`
    };

    console.log('CREANDO FAMILIA:', payload);

    this.api.createFamily(payload).subscribe({
      next: (res) => {
        console.log('FAMILIA CREADA:', res);
        alert('Familia creada correctamente 🎉');
        this.router.navigateByUrl('/family');
      },
      error: (err) => {
        console.error('ERROR CREANDO FAMILIA:', err);
        alert('Error al crear familia');
      }
    });
  }
}
