import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyDataApi } from '../../services/family-data.api';
import { Icard } from '../../interfaces/ICard';

@Component({
  selector: 'app-member-create',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './member-create.html',
  styleUrl: './member-create.css',
})
export class MemberCreate implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FamilyDataApi);

  familyId: number | null = null;

  // ✅ input date usa string, lo controlamos aquí
  birthdateInput: string = '';

  NewCard: Icard = {
    full_name: '',
    relationship: '',
    is_child: false,
    birthdate: null,
    gender: '',
    city: '',
    hobbys: '',
    email: '',
    password: '',
    is_admin: false,
  };

  cards = signal<Icard[]>([]);

  // ✅ mismos avatares que tu dashboard (simple)
  readonly AVATAR_MAP: Record<string, string> = {
    mother: '/madre.jpg',
    father: '/padre.jpg',
    grandma: '/abuela.jpg',
    grandpa: '/abuelo.jpg',
    aunt: '/tia.jpg',
    uncle: '/tio.jpg',
    default: '/default.jpg',
  };

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('familyId');
    this.familyId = id ? Number(id) : null;
  }

  setBirthdate(value: string) {
    this.birthdateInput = value;
    this.NewCard.birthdate = value ? new Date(value) : null;
  }

  getPreviewAvatar() {
    if (this.NewCard.is_child) {
      const g = (this.NewCard.gender || '').toLowerCase().trim();
      return g === 'female' ? '/nina.jpg' : '/nino.jpg';
    }
    const r = (this.NewCard.relationship || '').toLowerCase().trim();
    return this.AVATAR_MAP[r] || this.AVATAR_MAP['default'];
  }

  generateCard() {
    if (!this.NewCard.full_name.trim()) return;

    // ✅ si es child, exige gender para poder ver foto bien
    if (this.NewCard.is_child && !this.NewCard.gender) {
      alert('Si es niño/a, elige género para la foto 🙂');
      return;
    }

    this.cards.update((val) => [...val, { ...this.NewCard }]);
  }

  addMember(card: Icard) {
    if (!this.familyId) {
      alert('Falta familyId');
      return;
    }

    // ✅ si es child, exige gender (para que luego el avatar funcione)
    if (card.is_child && !card.gender) {
      alert('Para niño/a debes elegir género 🙂');
      return;
    }

    const birthdateStr =
      card.birthdate instanceof Date
        ? card.birthdate.toISOString().slice(0, 10)
        : null;

    const payload = {
      family_id: this.familyId,
      full_name: card.full_name,
      relationship: card.relationship,
      is_child: card.is_child,
      birthdate: birthdateStr,
      gender: card.gender || null,
      city: card.city || null,
      hobbys: card.hobbys || null,
      email: card.email || null,
      password: card.password || null,
      is_admin: card.is_admin,
    };

    this.api.postMember(payload).subscribe({
      next: () => this.router.navigateByUrl('/family'),
      error: (err: any) => {
        console.error(err);
        alert('Error al guardar miembro');
      },
    });
  }

  removeCard(index: number) {
    const copy = [...this.cards()];
    copy.splice(index, 1);
    this.cards.set(copy);
  }
}
