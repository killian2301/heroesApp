import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  hero!: Hero;
  destroy$: Subject<boolean> = new Subject<boolean>();
  mode: 'new' | 'edit' = 'new';
  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const heroId = params['id'];
        if (!heroId) return;

        this.mode = 'edit';
        this.heroService
          .getHero(heroId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((hero) => (this.hero = hero));
      });
  }

  onSubmit(hero: Omit<Hero, 'id'> | Hero) {
    if (this.mode === 'new') {
      this.saveNewHero(hero as Omit<Hero, 'id'>);
    } else {
      this.saveEditedHero(hero as Hero);
    }
  }

  saveNewHero(hero: Omit<Hero, 'id'>) {
    this.heroService
      .saveHero(hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/heroes']),
        error: (error) => console.error('Failed to save hero', error),
      });
  }

  saveEditedHero(hero: Hero) {
    this.heroService
      .updateHero(hero)
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
