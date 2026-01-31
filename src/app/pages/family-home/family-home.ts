import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FamilyDataApi } from '../../services/family-data.api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './family-home.html',
  styleUrl: './family-home.css',
})
export class FamilyHome implements OnInit {
  private api = inject(FamilyDataApi);
  private router = inject(Router);

  familyMembers = signal<any[]>([]);
  children = signal<any[]>([]);
  events = signal<any[]>([]);

  familyId = signal<number | null>(null);

  // ✅ modal / detalle
  selectedMember = signal<any | null>(null);

  readonly AVATAR_MAP: Record<string, string> = {
    mother: '/madre.jpg', madre: '/madre.jpg',
    father: '/padre.jpg', padre: '/padre.jpg',
    grandma: '/abuela.jpg', abuela: '/abuela.jpg',
    grandpa: '/abuelo.jpg', abuelo: '/abuelo.jpg',
    uncle: '/tio.jpg', tio: '/tio.jpg',
    aunt: '/tia.jpg', tia: '/tia.jpg',
    default: '/default.jpg',
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.api.getMyFamilies().subscribe({
      next: (families) => {
        if (families && families.length > 0) {
          const id = families[0].family_id || families[0].id;
          this.familyId.set(id);

          // ✅ Si tu backend mezcla niños/adultos, igual los separamos en frontend
          this.api.getMembersByFamily(id).subscribe(m => {
            this.familyMembers.set(m);
            // si tu endpoint children a veces falla o duplica, usamos filtro:
            this.children.set(m.filter((x: any) => !!x.is_child));
          });

          this.api.getEventsByFamily(id).subscribe(e => this.events.set(e));
        } else {
          this.router.navigateByUrl('/welcome');
        }
      },
      error: (err) => console.error('Error al obtener familias:', err)
    });
  }

  // ✅ lista adultos filtrada (por si el backend mete children aquí)
  adultsList() {
    return this.familyMembers().filter((m: any) => !m.is_child);
  }

  goAddMember() {
    const id = this.familyId();
    if (!id) {
      alert('No hay familyId todavía.');
      return;
    }
    this.router.navigate(['/member-create'], { queryParams: { familyId: id } });
  }

  // ✅ abrir modal
  openMember(m: any) {
    this.selectedMember.set(m);
  }

  closeMember() {
    this.selectedMember.set(null);
  }

  // ✅ ir a update (simple)
goUpdateMember(m: any) {
  const memberId = m?.id ?? m?.member_id;
  this.router.navigate(['/member-update'], { queryParams: { memberId } });
}

  goEvents() {
    const id = this.familyId();
    if (!id) {
      alert('No hay familyID todavia')
      return;

    }this.router.navigate(['events'], {queryParams: {familyId:id}})
  }
  
  getAvatarByRole(role: string) {
    const r = (role || '').toLowerCase().trim() || 'default';
    return this.AVATAR_MAP[r] || this.AVATAR_MAP['default'];
  }

  getAvatarForChild(child: any) {
    const g = String(child?.gender || '').toLowerCase().trim();
    return (g === 'female' || g === 'femenino') ? '/nina.jpg' : '/nino.jpg';
  }

  avatarForMember(m: any) {
    if (m?.is_child) return this.getAvatarForChild(m);
    return this.getAvatarByRole(m?.relationship);
  }

  goMemberAgenda(m: any) {
  const familyId = this.familyId();
  const memberId = m?.id ?? m?.member_id;

  if (!familyId || !memberId) {
    alert('Falta familyId o memberId');
    return;
  }

  this.router.navigate(['/events'], {
    queryParams: { familyId, memberId }
  });
}
goSeeCard(m: any) {
  const memberId = m?.id ?? m?.member_id;
  if (!memberId) return;
  this.router.navigate(['/member', memberId]);
}

}

   




