import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hero } from '../models/hero.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private httpService: HttpService) {}

  getHeroes(): Observable<Hero[]> {
    return this.httpService.get(`${environment.apiUrl}/heroes`);
  }
}
