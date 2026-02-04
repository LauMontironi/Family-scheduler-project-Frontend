import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { Landing } from './pages/landing/landing';
import { WelcomePage } from './pages/welcome/welcome';
import { FamilyHome } from './pages/family-home/family-home';
import { MemberCreate } from './components/member-create/member-create';
import { MemberUpdate } from './components/member-update/member-update';
import { Events } from './pages/events/events';
import { SeeCard } from './components/see-card/see-card';
import { NotFoundPage  } from './components/pages/not-found/not-found';
import { EventCalendarComponent } from './pages/event-calendar/event-calendar';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      { path: '', component: Landing },
      { path: 'welcome', component: WelcomePage },
      { path: 'family', component: FamilyHome },
      { path: 'member-create', component: MemberCreate },
      { path: 'member-update', component: MemberUpdate },
      { path: 'member/:id', component: SeeCard },
      { path: 'events', component: Events },
      { path: 'calendar', component: EventCalendarComponent },
      { path: '**', component: NotFoundPage }
    ],
  },

 
  { path: '**', component: NotFoundPage }
];
