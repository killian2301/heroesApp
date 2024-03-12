import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, firstValueFrom, of } from 'rxjs';
import { heroMock, heroesMock } from '../../../testing/heroes.mock';
import { HeroFilterService } from './hero-filter.service';
import { HeroService } from './hero.service';

describe('HeroFilterService', () => {
  let service: HeroFilterService;
  let heroService: HeroService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroFilterService);
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
    const expectedHero = heroMock;
    heroService.getHeroes = jest.fn(() => of(heroesMock));
    const query = 'batm';

    const filteredHeroes = await firstValueFrom(
      service.fetchFilteredHeroes(query),
    );
    expect(filteredHeroes).toEqual([expectedHero]);
  });
});
