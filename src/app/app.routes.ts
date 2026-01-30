import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { Landing } from './pages/landing/landing';
import { WelcomePage } from './pages/welcome/welcome';
import { FamilyHome } from './pages/family-home/family-home';
import { MemberCreate } from './components/member-create/member-create';
import { MemberUpdate } from './components/member-update/member-update';
import { Events } from './pages/events/events';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      // { path: '',pathMatch:'full', redirectTo: '/FamilyHome' },
      { path: '', component: Landing },
      { path: 'welcome', component: WelcomePage },
      { path: 'family', component: FamilyHome },
      { path: 'member-create', component: MemberCreate },
      { path: 'member-update', component: MemberUpdate },
      { path: 'events', component: Events },


      {path:'**', component:Error}
      // { path: 'families', component: FamiliesPage },
      // { path: 'families/create', component: FamilyCreatePage },
    ],
  },
];
