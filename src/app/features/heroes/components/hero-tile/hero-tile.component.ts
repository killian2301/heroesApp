import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Hero } from '../../../../core/models/hero.model';

@Component({
  selector: 'app-hero-tile',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './hero-tile.component.html',
  styleUrl: './hero-tile.component.scss',
})
export class HeroTileComponent {
  @Input() hero?: Hero;
}
