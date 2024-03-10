import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  debounceTime,
  map,
  switchMap,
} from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { HeroService } from './hero.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFilterService {
  querySubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredHeroesSubject: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(
    []
  );
  constructor(
    private heroService: HeroService,
    private errorHandler: ErrorHandlerService
  ) {
    this.setUpSubscription();
  }

  private setUpSubscription(): void {
    this.querySubject
      .pipe(
        debounceTime(500),
        switchMap((filterQuery) => this.fetchFilteredHeroes(filterQuery)),
        catchError(this.errorHandler.handle)
      )
      .subscribe((heroes) => this.filteredHeroesSubject.next(heroes));
  }

  filter(query: string): void {
    this.querySubject.next(query);
  }

  fetchFilteredHeroes(query: string): Observable<Hero[]> {
    return this.heroService.getHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) => hero.name.includes(query.toLowerCase()))
      ),
      catchError(this.errorHandler.handle)
    );
  }

  getFilteredHeroes(): Observable<Hero[]> {
    return this.filteredHeroesSubject.asObservable();
  }
}
