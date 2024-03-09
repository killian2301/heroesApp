import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { HeroFilterService } from './hero-filter.service';

describe('HeroFilterService', () => {
  let service: HeroFilterService;
  let httpService: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HeroFilterService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save query', () => {
    const query = 'Spider';
    service.query = new BehaviorSubject('');
    service.filter(query);
    expect(service.query.value).toBe(query);
  });

  it('should fetch heroes to the API', () => {
    const spy = jest.spyOn(httpService, 'get');
    const query = 'Spider';
    service.fetchFilteredHeroes(query);
    expect(spy).toHaveBeenCalledWith(`/heroes?name=${query}`);
  });
});
