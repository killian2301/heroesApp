import { UpperCasePipe } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeaderComponent } from '../../../../layout/header/header.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DeleteHeroComponent } from '../../components/delete-hero/delete-hero.component';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [
    UpperCasePipe,
    ButtonComponent,
    RouterModule,
    DeleteHeroComponent,
    HeaderComponent,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero!: Hero;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  onHeroDeleted(success: boolean): void {
    if (!success) return;
    this.goToHeroesList();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private goToHeroesList(): void {
    this.ngZone.run(() => this.router.navigate(['/heroes']));
  }

  private getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService
      .getHero(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (hero) => (this.hero = hero),
        error: (err) => console.error('Error fetching hero:', err),
      });
  }
}
