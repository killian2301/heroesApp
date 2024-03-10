import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Subject, takeUntil } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroFilterComponent } from '../../components/hero-filter/hero-filter.component';
import { HeroTileComponent } from '../../components/hero-tile/hero-tile.component';
import { HeroFilterService } from '../../services/hero-filter.service';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HeroTileComponent,
    HeroFilterComponent,
    HttpClientModule,
  ],
  providers: [HeroFilterService],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
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
