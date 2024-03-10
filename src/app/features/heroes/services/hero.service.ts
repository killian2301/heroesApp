import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
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
    private errorHandler: ErrorHandlerService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpService
      .get<Hero[]>(`${environment.apiUrl}/heroes`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch heroes', [])
        )
      );
  }
  getHero(id: number): Observable<Hero> {
    return this.httpService
      .get<Hero>(`${environment.apiUrl}/heroes/${id}`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch hero')
        )
      );
  }

  saveHero(hero: Omit<Hero, 'id'>): Observable<Hero> {
    const newHero = Hero.create(hero);
    console.log(newHero);
    return this.httpService
      .post<Hero>(`${environment.apiUrl}/heroes`, newHero)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch hero')
        )
      );
  }
  deleteHero(heroId: number): Observable<Hero> {
    return this.httpService
      .delete<Hero>(`${environment.apiUrl}/heroes/${heroId}`)
      .pipe(
        catchError((error) =>
          this.errorHandler.handle(error, 'Failed to fetch hero')
        )
      );
  }
}
