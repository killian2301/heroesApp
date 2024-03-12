import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { LoaderService } from '../../../../core/services/loader.service';
import { HeroFilterService } from '../../services/hero-filter.service';
import { HeroTileComponent } from '../hero-tile/hero-tile.component';
import { NoHeroesFoundComponent } from '../no-heroes-found/no-heroes-found.component';

@Component({
  selector: 'app-heroes-list',
  standalone: true,
  imports: [
    CommonModule,
    HeroTileComponent,
    RouterModule,
    MatListModule,
    MatPaginatorModule,
    NoHeroesFoundComponent,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  destroy$ = new Subject();
  isLoading = false;
  constructor(
    private heroFilterService: HeroFilterService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.setupHeroSubscription();
    this.setupLoaderSubscription();
  }

  private setupHeroSubscription() {
    this.heroFilterService
      .getFilteredHeroes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((heroes) => (this.heroes = heroes));
  }

  private setupLoaderSubscription() {
    this.loaderService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => (this.isLoading = loading));
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
