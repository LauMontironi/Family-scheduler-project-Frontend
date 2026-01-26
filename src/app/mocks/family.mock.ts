export type RelationshipLabel = 'mother' | 'father' | 'grandma' | 'grandpa' | 'aunt' | 'uncle' | 'other';

export interface FamilyMemberCard {
  id: number;
  full_name: string;
  relationship_label: RelationshipLabel;
}

export interface ChildCard {
  id: number;
  name: string;
  birthdate?: string;
  avatar_url: string;
}

export type EventType = 'activity' | 'medical' | 'birthday' | 'reminder' | 'school' | 'other';

export interface EventCard {
  id: number;
  title: string;
  type: EventType;
  start_at: string;
  child_id?: number | null;
}

export const MOCK_MEMBERS: FamilyMemberCard[] = [
  { id: 1, full_name: 'Silvia', relationship_label: 'mother' },
  { id: 2, full_name: 'Marco Rossi', relationship_label: 'father' },
  { id: 3, full_name: 'Ana Belmaña', relationship_label: 'grandma' },
  { id: 4, full_name: 'Carlos Montironi', relationship_label: 'uncle' },
];

export const MOCK_CHILDREN: ChildCard[] = [
  { id: 10, name: 'Emma', birthdate: '2016-05-12', avatar_url: '/niña.jpg' },
  { id: 11, name: 'Lucas', birthdate: '2019-09-03', avatar_url: '/niño.jpg' },
];

export const MOCK_EVENTS: EventCard[] = [
  { id: 100, title: 'Clase de danza', type: 'activity', start_at: '2026-02-03T17:00:00', child_id: 10 },
  { id: 101, title: 'Pediatra', type: 'medical', start_at: '2026-02-05T10:30:00', child_id: 11 },
  { id: 102, title: 'Cumpleaños Emma', type: 'birthday', start_at: '2026-05-12T00:00:00', child_id: 10 },
  { id: 103, title: 'Reunión familiar', type: 'reminder', start_at: '2026-02-01T19:00:00', child_id: null },
];

