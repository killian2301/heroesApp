import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from '../../../core/services/hero.service';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFilterService {
  query: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredHeroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  constructor(
    private httpService: HttpService,
    private heroService: HeroService
  ) {
    this.setUpSubscription();
  }

  private setUpSubscription() {
    this.query
      .pipe(
        debounceTime(500),
        switchMap((filterQuery) => this.fetchFilteredHeroes(filterQuery)),
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      )
      .subscribe((heroes) => this.filteredHeroes.next(heroes));
  }

  filter(query: string) {
    this.query.next(query);
  }

  fetchFilteredHeroes(query: string) {
    return this.heroService.getHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) => hero.name.includes(query.toLowerCase()))
      ),
      catchError((error) => {
        console.error(error);
        return of([]);
      })
    );
  }

  getFilteredHeroes() {
    return this.filteredHeroes.asObservable();
  }
}
