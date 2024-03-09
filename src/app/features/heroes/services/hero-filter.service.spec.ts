import { TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { HeroFilterService } from './hero-filter.service';

describe('HeroFilterService', () => {
  let service: HeroFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter heroes', () => {
    const query = 'Spider';
    service.filteredHeroes = new BehaviorSubject([
      { name: 'Spiderman' },
      { name: 'Batman' },
    ]);
    service.filter(query);
    expect(service.filteredHeroes.value).toEqual([{ name: 'Spiderman' }]);
  });
});
