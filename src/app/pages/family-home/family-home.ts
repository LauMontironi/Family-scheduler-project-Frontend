import { Component, signal, inject, OnInit } from '@angular/core';
import { FamilyDataApi } from '../../services/family-data.api';

@Component({
  selector: 'app-family-home',
  standalone: true,
  imports: [],
  templateUrl: './family-home.html',
  styleUrl: './family-home.css',
})
export class FamilyHome implements OnInit {
  // ✅ API
  familyMembers = signal<any[]>([]);
  children = signal<any[]>([]);
  events = signal<any[]>([]);

  private api = inject(FamilyDataApi);

  ngOnInit(): void {
    this.api.getMyFamilies().subscribe({
      next: (families) => {
        if (!families?.length) return;

        const familyId = families[0].family_id;

        // ✅ members
        this.api.getMembersByFamily(familyId).subscribe({
          next: (members) => this.familyMembers.set(members),
          error: (err) => console.error('members error', err),
        });

        // ✅ children
        this.api.getChildrenByFamily(familyId).subscribe({
          next: (kids) => this.children.set(kids),
          error: (err) => console.error('children error', err),
        });

        // ✅ events  (IMPORTANTE: aquí dentro, usando familyId)
        this.api.getEventsByFamily(familyId).subscribe({
          next: (evts) => {
            console.log('EVENTS ->', evts);
            this.events.set(evts);
          },
          error: (err) => console.error('events error', err),
        });
      },
      error: (err) => console.error('families/my error', err),
    });
  }

  // ✅ NO TOCO tus funciones
  getAvatarByRole(role: any) {
    const r = String(role ?? '').toLowerCase().trim();

    if (r === 'mother' || r === 'madre') return '/madre.jpg';
    if (r === 'father' || r === 'padre') return '/padre.jpg';
    if (r === 'grandma' || r === 'abuela') return '/abuela.jpg';
    if (r === 'grandpa' || r === 'abuelo') return '/abuelo.jpg';
    if (r === 'aunt' || r === 'tía' || r === 'tia') return '/tia.jpg';
    if (r === 'uncle' || r === 'tío' || r === 'tio') return '/tio.jpg';

    return '/default.jpg';
  }

  getIconByType(type: any) {
    switch (type) {
      case 'activity': return 'Extraescolar ⚽🎾🏊💃🏼';
      case 'medical': return 'Doctor 🩺👩🏼‍⚕️';
      case 'birthday': return 'Cumple 🎂';
      case 'reminder': return 'No olvidar 🔔';
      case 'school': return 'Cole 🎒';
      default: return '⁉️';
    }
  }

  getEventColorClass(type: string): string {
    switch (type) {
      case 'birthday': return 'event-birthday';
      case 'medical': return 'event-medical';
      case 'school': return 'event-school';
      case 'activity': return 'event-activity';
      case 'reminder': return 'event-reminder';
      default: return 'event-default';
    }
  }

  getAvatarForChild(child: any) {
    const g = String(child?.gender ?? child?.sexo ?? '').toLowerCase().trim();

    if (g === 'female' || g === 'femenino') return '/nina.jpg';
    if (g === 'male' || g === 'masculino') return '/nino.jpg';

    return '/child-default.jpg';
  }
}
