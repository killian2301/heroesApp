import { UpperCasePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DeleteHeroConfirmationDialogComponent } from '../../components/delete-hero-confirmation-dialog/delete-hero-confirmation-dialog.component';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe, ButtonComponent, RouterModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent implements OnDestroy {
  hero?: Hero;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.route.params
      .pipe(switchMap((params) => this.heroService.getHero(params['id'])))
      .subscribe((hero) => (this.hero = hero));
  }

  onDeleteHero() {
    const dialog = this.dialog.open(DeleteHeroConfirmationDialogComponent, {
      data: { hero: this.hero },
    });
    dialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleDeleteConfirmationResponse.bind(this));
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  private handleDeleteConfirmationResponse(answer: boolean) {
    if (!answer) return;
    this.deleteHero();
  }
  private deleteHero() {
    if (!this.hero) return;

    this.heroService
      .deleteHero(this.hero.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        complete: () => this.router.navigate(['/heroes']),
        error: (error) => console.error('Failed to delete hero', error),
      });
  }
}
