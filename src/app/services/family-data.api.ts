import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FamilyDataApi {
  private http = inject(HttpClient);

  private API = 'https://family-scheduler-project-backend.onrender.com';

  // Headers con Bearer (lo que tu backend espera)
  private getHeaders() {
    const token = localStorage.getItem('access_token');

    console.log('TOKEN EN API (getHeaders):', token);

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // 1) Obtener familias del usuario
  getMyFamilies() {
    return this.http.get<any[]>(`${this.API}/families/my`, {
      headers: this.getHeaders(),
    });
  }

  // 2) Crear familia
  createFamily(payload: { family_name: string }) {
    return this.http.post<any>(`${this.API}/families/`, payload, {
      headers: this.getHeaders(),
    });
  }

  // 3) Adultos (según tu backend)
  getMembersByFamily(familyId: number) {
    return this.http.get<any[]>(`${this.API}/fmembers/families/${familyId}`, {
      headers: this.getHeaders(),
    });
  }

  // 4) Niños
  getChildrenByFamily(familyId: number) {
    return this.http.get<any[]>(
      `${this.API}/children/families/${familyId}/children`,
      { headers: this.getHeaders() }
    );
  }

  // 5) Eventos
  getEventsByFamily(familyId: number) {
    return this.http.get<any[]>(`${this.API}/events/families/${familyId}`, {
      headers: this.getHeaders(),
    });
  }

  // 6) Crear niño
  postChild(data: any) {
    return this.http.post<any>(`${this.API}/children/`, data, {
      headers: this.getHeaders(),
    });
  }

  // Crear miembro
  postMember(data: any) {
    return this.http.post<any>(`${this.API}/fmembers/`, data, {
      headers: this.getHeaders(),
    });
  }
  //Crear evento
  createEvent(familyId: number, memberId: number, payload: any) {
    return this.http.post<any>(
      `${this.API}/events/families/${familyId}/members/${memberId}/events`,
      payload,
      { headers: this.getHeaders() }
    );
  }
  //Borrar evento
  deleteEvent(familyId: number, eventId: number) {
    return this.http.delete<any>(
      `${this.API}/events/families/${familyId}/events/${eventId}`,
      { headers: this.getHeaders() }
    );

  }
}