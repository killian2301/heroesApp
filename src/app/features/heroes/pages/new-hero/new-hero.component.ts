import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.scss',
})
export class NewHeroComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private heroService: HeroService, private router: Router) {}

  onSubmit(hero: Omit<Hero, 'id'>) {
    this.heroService
      .saveHero(hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/heroes']),
        error: (error) => console.error('Failed to save hero', error),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
