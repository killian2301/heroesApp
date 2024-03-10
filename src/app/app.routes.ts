import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/heroes/pages/heroes/heroes.component').then(
        (c) => c.HeroesComponent
      ),
  },
  {
    path: 'heroes/:id',
    loadComponent: () =>
      import('./features/heroes/pages/hero-detail/hero-detail.component').then(
        (c) => c.HeroDetailComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
