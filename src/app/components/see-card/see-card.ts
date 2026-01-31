import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyDataApi } from '../../services/family-data.api';

@Component({
  selector: 'app-see-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './see-card.html',
  styleUrl: './see-card.css',
})
export class SeeCard implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FamilyDataApi);

  member = signal<any | null>(null);
  loading = signal(true);

  // Reusa lógica de avatares 
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
    const idRaw = this.route.snapshot.paramMap.get('id');
    const memberId = idRaw ? Number(idRaw) : null;

    if (!memberId) {
      this.router.navigateByUrl('/family');
      return;
    }

    this.api.getMemberById(memberId).subscribe({
      next: (m) => {
        this.member.set(m);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        this.router.navigateByUrl('/family');
      },
    });
  }

  back() {
    this.router.navigateByUrl('/family');
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
}
