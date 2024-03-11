import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Hero } from '../../../core/models/hero.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { HttpService } from '../../../core/services/http.service';
import { HeroService } from './hero.service';

describe('HeroService', () => {
  const heroes: Hero[] = [{ id: 1, name: 'spiderman' }];
  let heroService: HeroService;
  let httpServiceMock: any;
  let errorHandlerMock: any;
  beforeEach(() => {
    httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      put: jest.fn(),
    };
    errorHandlerMock = {
      handle: jest.fn(),
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: HttpService, useValue: httpServiceMock },
        { provide: ErrorHandlerService, useValue: errorHandlerMock },
      ],
    });
    heroService = TestBed.inject(HeroService);
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  it('should fetch heroes', (done) => {
    const expectedHeroes = [{ id: 1, name: 'Batman' }];
    httpServiceMock.get.mockReturnValue(of(expectedHeroes));

    heroService.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      done();
    });
  });

  it('should handle error when fetching heroes fails', (done) => {
    const errorResponse = new Error('Failed to fetch heroes');
    httpServiceMock.get.mockReturnValue(throwError(() => errorResponse));
    errorHandlerMock.handle.mockReturnValue(of([]));

    heroService.getHeroes().subscribe((result) => {
      expect(result).toEqual([]);
      expect(errorHandlerMock.handle).toHaveBeenCalledWith(
        errorResponse,
        'Failed to fetch heroes',
        [],
      );
      done();
    });
  });

  it('should fetch a single hero', (done) => {
    const expectedHero = { id: 1, name: 'Batman' };
    httpServiceMock.get.mockReturnValue(of(expectedHero));

    heroService.getHero(1).subscribe((hero) => {
      expect(hero).toEqual(expectedHero);
      done();
    });
  });

  it('should handle error when fetching a single hero fails', (done) => {
    const errorResponse = new Error('Failed to fetch hero');
    httpServiceMock.get.mockReturnValue(throwError(() => errorResponse));
    errorHandlerMock.handle.mockReturnValue(of(null));

    heroService.getHero(1).subscribe((result) => {
      expect(result).toBeNull();
      expect(errorHandlerMock.handle).toHaveBeenCalledWith(
        errorResponse,
        'Failed to fetch hero',
      );
      done();
    });
  });

  it('should save a new hero', (done) => {
    const newHero = { name: 'Wonder Woman' };
    const savedHero = { ...newHero, id: 2 };
    httpServiceMock.post.mockReturnValue(of(savedHero));

    heroService.saveHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(savedHero);
      done();
    });
  });

  it('should handle error when saving a hero fails', (done) => {
    const errorResponse = new Error('Failed to save hero');
    httpServiceMock.post.mockReturnValue(throwError(() => errorResponse));
    errorHandlerMock.handle.mockReturnValue(of(null));

    heroService.saveHero({ name: 'Wonder Woman' }).subscribe((result) => {
      expect(result).toBeNull();
      expect(errorHandlerMock.handle).toHaveBeenCalledWith(
        errorResponse,
        'Failed to save hero',
      );
      done();
    });
  });

  it('should delete a hero', (done) => {
    const heroId = 1;
    httpServiceMock.delete.mockReturnValue(of({}));

    heroService.deleteHero(heroId).subscribe((result) => {
      expect(result).toEqual({});
      done();
    });
  });

  it('should handle error when deleting a hero fails', (done) => {
    const errorResponse = new Error('Failed to delete hero');
    httpServiceMock.delete.mockReturnValue(throwError(() => errorResponse));
    errorHandlerMock.handle.mockReturnValue(of(null));

    heroService.deleteHero(1).subscribe((result) => {
      expect(result).toBeNull();
      expect(errorHandlerMock.handle).toHaveBeenCalledWith(
        errorResponse,
        'Failed to delete hero',
      );
      done();
    });
  });

  it('should update a hero', (done) => {
    const heroToUpdate = { id: 1, name: 'Batman Updated' };
    httpServiceMock.put.mockReturnValue(of(heroToUpdate));

    heroService.updateHero(heroToUpdate).subscribe((updatedHero) => {
      expect(updatedHero).toEqual(heroToUpdate);
      done();
    });
  });

  it('should handle error when updating a hero fails', (done) => {
    const errorResponse = new Error('Failed to update hero');
    httpServiceMock.put.mockReturnValue(throwError(() => errorResponse));
    errorHandlerMock.handle.mockReturnValue(of(null));

    heroService
      .updateHero({ id: 1, name: 'Batman Updated' })
      .subscribe((result) => {
        expect(result).toBeNull();
        expect(errorHandlerMock.handle).toHaveBeenCalledWith(
          errorResponse,
          'Failed to update hero',
        );
        done();
      });
  });
});
