import { TitleCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Hero } from '../../../../core/models/hero.model';

@Component({
  selector: 'app-delete-hero-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    TitleCasePipe,
  ],
  templateUrl: './delete-hero-confirmation-dialog.component.html',
  styleUrl: './delete-hero-confirmation-dialog.component.scss',
})
export class DeleteHeroConfirmationDialogComponent {
  hero: Hero;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: Hero }) {
    this.hero = this.data.hero;
  }
}
