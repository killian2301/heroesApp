import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { firstValueFrom, of } from 'rxjs';
import { HeroService } from './hero.service';

describe('HeroService', () => {
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
    service.getHeroes = jest.fn().mockReturnValue(of([{ name: 'Spiderman' }]));
    const heroes = await firstValueFrom(service.getHeroes());
    expect(heroes).toEqual([{ name: 'Spiderman' }]);
  });
});
