import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show loader and set isLoading$ to true', (done) => {
    service.isLoading$.subscribe((isLoading) => {
      if (isLoading) {
        expect(isLoading).toBeTruthy();
        done();
      }
    });

    service.show();
  });

  it('should not show loader if show is called more than once without hide', (done) => {
    let emissions = 0;
    service.isLoading$.subscribe((isLoading) => {
      emissions++;
      if (emissions === 2) {
        expect(isLoading).toBeTruthy();
        done();
      }
    });

    service.show();
    service.show();
  });

  it('should hide loader and set isLoading$ to false', (done) => {
    service.show();
    service.isLoading$.subscribe((isLoading) => {
      if (!isLoading) {
        expect(isLoading).toBeFalsy();
        done();
      }
    });

    service.hide();
  });

  it('should not hide loader if hide is called without show', (done) => {
    let emissions = 0;
    service.isLoading$.subscribe((isLoading) => {
      emissions++;
      if (emissions === 1) {
        expect(isLoading).toBeFalsy();
        done();
      }
    });

    service.hide();
  });
});
