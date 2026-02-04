import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FamilyDataApi } from '../../services/family-data.api';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-event-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './event-calendar.html',
  styleUrl: './event-calendar.css',
})
export class EventCalendarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(FamilyDataApi);

  familyId = signal<number | null>(null);
  memberId = signal<number | null>(null);
  members = signal<any[]>([]);
  loading = signal(true);

  private palette = ['#2563eb', '#16a34a', '#dc2626', '#7c3aed', '#ea580c', '#0891b2', '#0f172a', '#db2777'];

  private isMobile = window.innerWidth < 768;

  calendarOptions: any = {
    
    initialView: this.isMobile ? 'timeGridDay' : 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
     
      left: this.isMobile ? 'prev,next' : 'prev,next today',
      center: 'title',
     
      right: this.isMobile ? 'dayGridMonth,timeGridDay' : 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    nowIndicator: true,
    scrollTime: '08:00:00',
    height: 'auto',
    locale: 'es',
    eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
    events: [],
  };

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.loading.set(true);
      const familyId = params.get('familyId') ? Number(params.get('familyId')) : null;
      const memberId = params.get('memberId') ? Number(params.get('memberId')) : null;

      if (!familyId) {
        this.router.navigateByUrl('/family');
        return;
      }

      this.familyId.set(familyId);
      this.memberId.set(Number.isFinite(memberId as any) ? memberId : null);

      this.api.getMembersByFamily(familyId).subscribe({
        next: (m) => {
          const normalized = (m || []).map((x: any) => ({
            ...x,
            id: x?.id ?? x?.member_id,
          }));
          this.members.set(normalized);

          if (this.memberId()) {
            this.loadEventsForOneMember(familyId, this.memberId()!);
          } else {
            // En vista "familia" el backend ya expone el endpoint agregado.
            // Evitamos N peticiones por miembro (y 404s/[] que te dejan el calendario vacío).
            this.loadEventsForFamily(familyId);
          }
        },
        error: (err) => console.error('Error cargando miembros:', err),
      });
    });
  }

  colorForMemberId(memberId: number): string {
    return this.palette[Math.abs(Number(memberId)) % this.palette.length];
  }

  private loadEventsForOneMember(familyId: number, memberId: number) {
    this.api.getEventsByFamilyMember(familyId, memberId).subscribe({
      next: (evs) => this.applyMappedEvents(evs || []),
      error: () => this.applyMappedEvents([]),
    });
  }

  private loadEventsForFamily(familyId: number) {
    this.api.getEventsByFamily(familyId).pipe(
      catchError((err) => {
        // Si el backend devuelve 404 cuando no hay eventos, lo tratamos como lista vacía
        if (err?.status === 404) return of([]);
        console.error('Error cargando eventos de familia:', err);
        return of([]);
      })
    ).subscribe({
      next: (evs) => this.applyMappedEvents(evs || []),
      error: () => this.applyMappedEvents([]),
    });
  }

  private applyMappedEvents(events: any[]) {
    console.log('EVENTOS RECIBIDOS:', events.length);
    const mapped = (events || [])
      .map(ev => this.toCalendarEvent(ev))
      .filter(Boolean) as any[];

    // Ordenar por fecha para encontrar el primero
    mapped.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...mapped],
      // Si hay eventos, saltamos a la fecha del primero para no ver el calendario vacío
      ...(mapped.length > 0 ? { initialDate: mapped[0].start.split('T')[0] } : {})
    };

    this.loading.set(false);
  }

  private toIso(dt: string) {
    if (!dt) return '';
    return dt.trim().includes(' ') ? dt.replace(' ', 'T') : dt;
  }

  private toCalendarEvent(ev: any) {
    const rawStart = ev.start_at || ev.start_date || ev.start || ev.startDate || ev.start_time;
    const rawEnd = ev.end_at || ev.end_date || ev.end || ev.endDate || ev.end_time;

    if (!rawStart) return null;

    const start = this.toIso(rawStart);
    const end = rawEnd ? this.toIso(rawEnd) : null;
    const memberIdNum = Number(ev.member_id || ev.memberId || ev.member?.id);
    const color = this.colorForMemberId(memberIdNum);

    return {
      id: String(ev.id),
      title: `${this.iconByType(ev.type)} ${ev.title}`,
      start,
      end,
      backgroundColor: color,
      borderColor: color,
      textColor: '#ffffff',
      allDay: !start.includes('T') || start.length <= 10
    };
  }

  private iconByType(type: string) {
    const icons: Record<string, string> = { activity: '⚽', medical: '🩺', birthday: '🎂', school: '🎒' };
    return icons[type] || '🔔';
  }

  backToEvents() {
    this.router.navigate(['/events'], {
      queryParams: { familyId: this.familyId(), ...(this.memberId() ? { memberId: this.memberId() } : {}) }
    });
  }
}