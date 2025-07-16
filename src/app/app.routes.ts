import { Routes } from '@angular/router';
import { TermsComponent } from './components/terms/terms.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'landing',
    component: LandingpageComponent,
    title: 'ProCare'
  },
  {
    path: 'terms',
    loadComponent: () => import('./components/terms/terms.component').then(m => m.TermsComponent),
    title: 'Terms and Conditions - ProCare'
  },
  {
    path: '**',
    redirectTo: 'landing',
    pathMatch: 'full'
  }
];
