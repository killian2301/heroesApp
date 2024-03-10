import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  const heroes: Hero[] = [{ id: 1, name: 'spiderman' }];
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of heroes', async () => {
    const expected = heroes[0];
    service.getHeroes = jest.fn().mockReturnValue(of(heroes));
    const result = await firstValueFrom(service.getHeroes());
    expect(result).toEqual([expected]);
  });

  it('should return a hero by id', async () => {
    service.getHero = jest.fn().mockReturnValue(of(heroes[0]));
    const hero = await firstValueFrom(service.getHero(1));
    expect(hero).toEqual(heroes[0]);
  });
});
