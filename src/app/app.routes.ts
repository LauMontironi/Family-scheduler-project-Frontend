import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { Landing } from './pages/landing/landing';
import { WelcomePage } from './pages/welcome/welcome';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      { path: '', component: Landing },
      { path: 'welcome', component: WelcomePage },

      // más adelante
      // { path: 'families', component: FamiliesListPage },
      // { path: 'families/create', component: FamilyCreatePage },
    ],
  },
];
