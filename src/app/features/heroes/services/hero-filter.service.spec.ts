import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { HeroService } from '../../../core/services/hero.service';
import { HttpService } from '../../../core/services/http.service';
import { HeroFilterService } from './hero-filter.service';

describe('HeroFilterService', () => {
  let service: HeroFilterService;
  let httpService: HttpService;
  let heroService: HeroService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroFilterService);
    httpService = TestBed.inject(HttpService);
    heroService = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save query', () => {
    const query = 'spider';
    service.querySubject = new BehaviorSubject('');
    service.filter(query);
    expect(service.querySubject.value).toBe(query);
  });

  it('should fetch heroes to the API', async () => {
    const expectedHero = { name: 'spiderman' };
    const heroes = [{ name: 'spiderman' }, { name: 'superman' }];
    heroService.getHeroes = jest.fn(() => of(heroes));
    const query = 'spider';

    const filteredHeroes = await firstValueFrom(
      service.fetchFilteredHeroes(query)
    );
    expect(filteredHeroes).toEqual([expectedHero]);
  });
});
