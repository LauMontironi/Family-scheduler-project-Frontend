import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FamilyDataApi {
  private http = inject(HttpClient);
  private API = 'https://family-scheduler-project-backend.onrender.com';

  getMyFamilies() {
    return this.http.get<any[]>(`${this.API}/families/my`);
  }

  getMembersByFamily(familyId: number) {
    return this.http.get<any[]>(`${this.API}/fmembers/families/${familyId}`);
  }

getChildrenByFamily(familyId: number) {
  return this.http.get<any[]>(`${this.API}/children/families/${familyId}/children`);
}


getEventsByFamily(familyId: number) {
  return this.http.get<any[]>(`${this.API}/events/families/${familyId}`);
}

}

