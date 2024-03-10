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
    path: 'heroes/new',
    loadComponent: () =>
      import('./features/heroes/pages/new-hero/new-hero.component').then(
        (c) => c.NewHeroComponent
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
