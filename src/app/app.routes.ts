import { Routes } from '@angular/router';
import { LayoutShell } from './layout/layout-shell/layout-shell';
import { Landing } from './pages/landing/landing';
import { WelcomePage } from './pages/welcome/welcome';
import { FamilyHome } from './pages/family-home/family-home';

export const routes: Routes = [
  {
    path: '',
    component: LayoutShell,
    children: [
      { path: '', component: Landing },
      { path: 'welcome', component: WelcomePage },
      { path: 'family', component: FamilyHome },
      // { path: 'families', component: FamiliesPage },
      // { path: 'families/create', component: FamilyCreatePage },
    ],
  },
];
