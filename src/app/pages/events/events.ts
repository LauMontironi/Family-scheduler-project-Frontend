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
  memberId = signal<number | null>(null);

  members = signal<any[]>([]);
  events = signal<any[]>([]);

  showCreate = signal(false);

  ngOnInit(): void {
    // Escuchamos cambios por si navegas con queryParams diferentes
    this.route.queryParamMap.subscribe((params) => {
      const familyIdRaw = params.get('familyId');
      const memberIdRaw = params.get('memberId');

      const familyId = familyIdRaw ? Number(familyIdRaw) : null;
      const memberId = memberIdRaw ? Number(memberIdRaw) : null;

      if (!familyId) {
        this.router.navigateByUrl('/family');
        return;
      }

      this.familyId.set(familyId);
      this.memberId.set(Number.isFinite(memberId as number) ? memberId : null);

      // 1) Cargar miembros y normalizar el ID (a veces viene como id, a veces como member_id)
      this.api.getMembersByFamily(familyId).subscribe({
        next: (m) => {
          const normalized = (m || []).map((x: any) => ({
            ...x,
            id: x?.id ?? x?.member_id, // 👈 normalizamos para que el template use siempre m.id
          }));

          // Si vienes filtrando por miembro, mostramos solo ese miembro
          if (this.memberId()) {
            this.members.set(normalized.filter((x: any) => Number(x.id) === Number(this.memberId())));
          } else {
            this.members.set(normalized);
          }
        },
        error: (err) => console.error('Error members:', err),
      });

      // 2) Cargar eventos: por miembro si hay memberId, si no por familia
      if (this.memberId()) {
        this.api.getEventsByFamilyMember(familyId, this.memberId()!).subscribe({
          next: (e) => this.events.set(e),
          error: (err) => {
            // Si el backend devuelve 404 cuando no hay eventos, lo tratamos como lista vacía
            if (err?.status === 404) {
              this.events.set([]);
              return;
            }
            console.error('Error events by member:', err);
          },
        });
      } else {
        this.api.getEventsByFamily(familyId).subscribe({
          next: (e) => this.events.set(e),
          error: (err) => console.error('Error events by family:', err),
        });
      }
    });
  }

  toggleCreate() {
    this.showCreate.update((v) => !v);
  }

  back() {
    this.router.navigateByUrl('/family');
  }

  clearMemberFilter() {
    const fid = this.familyId();
    if (!fid) return;

    this.router.navigate(['/events'], {
      queryParams: { familyId: fid },
    });
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

  // Agrupa eventos por miembro (sirve tanto en modo familia como modo miembro)
  eventsForMember(memberId: number) {
    return this.events()
      .filter((ev: any) => Number(ev.member_id) === Number(memberId))
      .sort(
        (a: any, b: any) =>
          new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
      );
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
        // recargar eventos según filtro actual
        if (this.memberId()) {
          this.api
            .getEventsByFamilyMember(familyId, this.memberId()!)
            .subscribe({
              next: (e) => this.events.set(e),
              error: (err) => {
                if (err?.status === 404) {
                  this.events.set([]);
                  return;
                }
                console.error('Error events by member:', err);
              },
            });
        } else {
          this.api.getEventsByFamily(familyId).subscribe((e) => this.events.set(e));
        }

        this.showCreate.set(false);
      },
      error: (err: any) => {
        console.error(err);
        alert('Error al crear evento');
      },
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
      },
    });
  }

goToCalendar() {
  const fid = this.familyId();
  if (!fid) return;

  const mid = this.memberId(); // puede ser null
  this.router.navigate(['/calendar'], {
    queryParams: {
      familyId: fid,
      ...(mid ? { memberId: mid } : {})
    }
  });
}


}
