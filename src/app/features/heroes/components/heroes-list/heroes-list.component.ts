import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroFilterService } from '../../services/hero-filter.service';
import { HeroTileComponent } from '../hero-tile/hero-tile.component';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [CommonModule, HeroTileComponent],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  unsubscriber = new Subject();

  constructor(private heroFilterService: HeroFilterService) {}

  ngOnInit() {
    this.heroFilterService
      .getFilteredHeroes()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((heroes) => (this.heroes = heroes));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(true);
    this.unsubscriber.complete();
  }
}
