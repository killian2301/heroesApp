import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroFilterService } from '../../services/hero-filter.service';
import { HeroTileComponent } from '../hero-tile/hero-tile.component';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, HeroTileComponent, RouterModule],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  destroy$ = new Subject();

  constructor(private heroFilterService: HeroFilterService) {}

  ngOnInit() {
    this.heroFilterService
      .getFilteredHeroes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
