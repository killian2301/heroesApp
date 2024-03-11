import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HeroService } from '../../services/hero.service';
import { DeleteHeroConfirmationDialogComponent } from '../delete-hero-confirmation-dialog/delete-hero-confirmation-dialog.component';

@Component({
  selector: 'app-delete-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './delete-hero.component.html',
  styleUrl: './delete-hero.component.scss',
})
export class DeleteHeroComponent {
  @Input() hero!: Hero;
  @Output() heroDeleted = new EventEmitter<boolean>();
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialog: MatDialog,
    private heroService: HeroService,
  ) {}

  onDeleteHero() {
    const dialog = this.dialog.open(DeleteHeroConfirmationDialogComponent, {
      data: { hero: this.hero },
    });
    dialog
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.handleDeleteConfirmationResponse.bind(this));
  }
  private handleDeleteConfirmationResponse(answer: boolean) {
    if (!answer) return;
    this.deleteHero();
  }
  private deleteHero() {
    this.heroService
      .deleteHero(this.hero.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.heroDeleted.emit(true);
        },
        error: (err) => {
          this.heroDeleted.emit(false);
        },
      });
  }
}
