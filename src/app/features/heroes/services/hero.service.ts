import { Injectable } from '@angular/core';
import { Observable, catchError, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Hero } from '../../../core/models/hero.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private httpService: HttpService,
    private errorHandler: ErrorHandlerService,
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpService
      .get<Hero[]>(`${environment.apiUrl}/heroes`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch heroes', []),
        ),
      );
  }
  getHero(id: number): Observable<Hero> {
    return this.httpService
      .get<Hero>(`${environment.apiUrl}/heroes/${id}`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch hero'),
        ),
      );
  }
  saveHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
    return this.getHeroes().pipe(
      switchMap((heroes) => {
        const nextId = heroes[heroes.length - 1].id + 1;
        const newHero = Hero.create(hero, nextId);
        return this.httpService
          .post<Hero>(`${environment.apiUrl}/heroes`, newHero)
          .pipe(
            catchError((error) =>
              this.errorHandler.handle(error, 'Failed to save hero'),
            ),
          );
      }),
    );
  }
  deleteHero(heroId: number): Observable<Hero> {
    return this.httpService
      .delete<Hero>(`${environment.apiUrl}/heroes/${heroId}`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to delete hero'),
        ),
      );
  }
  updateHero(hero: Hero) {
    return this.httpService
      .put<Hero>(`${environment.apiUrl}/heroes/${hero.id}`, hero)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to update hero'),
        ),
      );
  }
}
