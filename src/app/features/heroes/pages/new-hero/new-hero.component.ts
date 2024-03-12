import { UpperCasePipe } from '@angular/common';
import { Component, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeaderComponent } from '../../../../layout/header/header.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { DeleteHeroComponent } from '../../components/delete-hero/delete-hero.component';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [
    HeroFormComponent,
    HeaderComponent,
    RouterModule,
    UpperCasePipe,
    HeaderComponent,
    DeleteHeroComponent,
  ],
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
    private ngZone: NgZone,
    private notificationService: NotificationService,
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
  onHeroDeleted(isDeleted: boolean) {
    if (!isDeleted) return;
    this.notificationService.success('Hero deleted');
    this.goBackToHeroesList();
  }
  private initializeComponent() {
    const heroId = this.activatedRoute.snapshot.params['id'];
    if (!heroId) return;
    this.mode = 'edit';
    this.loadHero(heroId);
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
        next: () => {
          this.notificationService.success('Hero saved');
          this.goBackToHeroesList();
        },
        error: (error) => console.error('Failed to save hero', error),
      });
  }
  private saveEditedHero(hero: Hero) {
    this.heroService
      .updateHero(hero)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.success('Hero updated');
          this.goBackToHeroesList();
        },
        error: (error) => console.error('Failed to save hero', error),
      });
  }

  private goBackToHeroesList() {
    this.ngZone.run(() => this.router.navigate(['/heroes']));
  }
}
