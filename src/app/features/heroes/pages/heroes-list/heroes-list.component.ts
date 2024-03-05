import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Hero } from '../../../../core/models/hero.model';
@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent {
  heroes: Hero[] = [];
}
