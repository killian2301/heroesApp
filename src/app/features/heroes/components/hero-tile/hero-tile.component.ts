import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardImage, MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';
import { Hero } from '../../../../core/models/hero.model';
import { NoDescriptionPipe } from '../../../pipes/no-description.pipe';

@Component({
  selector: 'app-hero-tile',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatCardModule,
    MatButton,
    RouterModule,
    MatCardImage,
    MatChipsModule,
    NoDescriptionPipe,
  ],
  templateUrl: './hero-tile.component.html',
  styleUrl: './hero-tile.component.scss',
})
export class HeroTileComponent {
  @Input() hero!: Hero;
}
