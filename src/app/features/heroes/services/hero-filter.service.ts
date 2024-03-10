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
import { HeroService } from '../../../core/services/hero.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFilterService {
  query: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredHeroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  constructor(
    private heroService: HeroService,
    private errorHandler: ErrorHandlerService
  ) {
    this.setUpSubscription();
  }

  private setUpSubscription(): void {
    this.query
      .pipe(
        debounceTime(500),
        switchMap((filterQuery) => this.fetchFilteredHeroes(filterQuery)),
        catchError(this.errorHandler.handle)
      )
      .subscribe((heroes) => this.filteredHeroes.next(heroes));
  }

  filter(query: string): void {
    this.query.next(query);
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
    return this.filteredHeroes.asObservable();
  }
}
