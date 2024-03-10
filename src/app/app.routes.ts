import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/heroes/pages/heroes/heroes.component').then(
        (c) => c.HeroesListComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
