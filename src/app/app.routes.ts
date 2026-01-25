import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { Landing } from './pages/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      { path: '', component: Landing },
      // luego:
      // { path: 'login', component: Login },
      // { path: 'register', component: Register },
      // { path: 'families', component: Families },
    ],
  },
 
];
