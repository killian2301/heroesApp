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
  private destroy$: Subject<boolean> = new Subject<boolean>();
  hero!: Hero;
  mode: 'new' | 'edit' = 'new';
  constructor(
    private heroService: HeroService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.initializeComponent();
  }
  onSubmit(hero: Omit<Hero, 'id'> | Hero): void {
    this.mode === 'new'
      ? this.saveNewHero(hero as Omit<Hero, 'id'>)
      : this.saveEditedHero(hero as Hero);
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  private initializeComponent() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params) => {
        const heroId = params['id'];
        if (!heroId) return;
        this.mode = 'edit';
        this.loadHero(heroId);
      },
      error: (error) => console.error('Error loading hero', error),
    });
  }
  private loadHero(heroId: number): void {
    this.heroService
      .getHero(heroId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hero) => (this.hero = hero),
        error: (error) => console.error('Failed to load hero', error),
      });
  }
  private saveNewHero(hero: Omit<Hero, 'id'>) {
    this.heroService
      .saveHero(hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/heroes']),
        error: (error) => console.error('Failed to save hero', error),
      });
  }
  private saveEditedHero(hero: Hero) {
    this.heroService
      .updateHero(hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/heroes']),
        error: (error) => console.error('Failed to save hero', error),
      });
  }
}
