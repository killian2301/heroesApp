import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { HttpService } from '../../../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class HeroFilterService {
  query: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredHeroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  constructor(private httpService: HttpService) {
    this.query.subscribe((query) => this.fetchFilteredHeroes(query));
  }

  filter(query: string) {
    this.query.next(query);
  }

  fetchFilteredHeroes(query: string) {
    this.httpService
      .get<Hero[]>(`/heroes?name=${query}`)
      .subscribe((heroes) => this.filteredHeroes.next(heroes));
  }
}
