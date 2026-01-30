import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FamilyDataApi } from '../../services/family-data.api';
import { EventCreate } from '../../components/events-create/events-create';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, EventCreate],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FamilyDataApi);

  familyId = signal<number | null>(null);

  members = signal<any[]>([]);
  events = signal<any[]>([]);

  showCreate = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('familyId');
    const familyId = id ? Number(id) : null;

    if (!familyId) {
      this.router.navigateByUrl('/family');
      return;
    }

    this.familyId.set(familyId);

    this.api.getMembersByFamily(familyId).subscribe(m => this.members.set(m));
    this.api.getEventsByFamily(familyId).subscribe(e => this.events.set(e));
  }

  toggleCreate() {
    this.showCreate.update(v => !v);
  }

  back() {
    this.router.navigateByUrl('/family');
  }

  getIconByType(type: string) {
    const icons: Record<string, string> = {
      activity: '⚽🎾🏊',
      medical: '🩺👩🏼‍⚕️',
      birthday: '🎂',
      school: '🎒',
    };
    return icons[type] || '🔔';
  }

  eventsForMember(memberId: number) {
    return this.events()
      .filter((ev: any) => ev.member_id === memberId)
      .sort((a: any, b: any) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
  }

  handleEventCreated(data: any) {
    const familyId = this.familyId();
    if (!familyId) return;

    const memberId = Number(data.member_id);
    if (!memberId) {
      alert('Selecciona un familiar');
      return;
    }

    const payload = {
      title: data.title,
      description: data.notes || '',
      location: data.location || '',
      type: data.type || 'activity',
      start_at: data.start_at,
      end_at: data.end_at,
    };

    this.api.createEvent(familyId, memberId, payload).subscribe({
      next: () => {
        this.api.getEventsByFamily(familyId).subscribe(e => this.events.set(e));
        this.showCreate.set(false);
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al crear evento');
      }
    });
  }

  deleteEvent(ev: any) {
    const familyId = this.familyId();
    if (!familyId) return;

    const ok = confirm(`¿Eliminar evento "${ev.title}"?`);
    if (!ok) return;

    this.api.deleteEvent(familyId, ev.id).subscribe({
      next: () => {
        this.events.set(this.events().filter((x: any) => x.id !== ev.id));
      },
      error: (err: any) => {
        console.error(err);
        alert('No se pudo eliminar');
      }
    });
  }
}
