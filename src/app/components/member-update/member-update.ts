import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-update.html',
  styleUrl: './member-update.css',
})
export class MemberUpdate {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  memberId: number | null = null;

  // ✅ ESTO es lo que tu template necesita
  form = {
    full_name: '',
    relationship: '',
    city: '',
    hobbys: '',
    gender: '',
  };

  constructor() {
    const id = this.route.snapshot.queryParamMap.get('memberId');
    this.memberId = id ? Number(id) : null;
  }

  // ✅ ESTO lo llama el botón Guardar
  save() {
    console.log('SAVE UPDATE:', this.memberId, this.form);
    alert('Update listo (pantalla). me falta conectar al backend! 🙂');
    this.router.navigateByUrl('/family');
  }

  // ✅ ESTO lo llama el botón Cancelar
  cancel() {
    this.router.navigateByUrl('/family');
  }
}
