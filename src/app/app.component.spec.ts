import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { LoaderService } from './core/services/loader.service';

class MockLoaderService {
  public isLoading$ = new BehaviorSubject<boolean>(false);
}
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockLoaderService: MockLoaderService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: LoaderService,
          useClass: MockLoaderService,
        },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockLoaderService = TestBed.inject(
      LoaderService,
    ) as unknown as MockLoaderService;
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should update isLoading when LoaderService emits', () => {
    expect(component.isLoading).toBeFalsy();

    mockLoaderService.isLoading$.next(true);
    fixture.detectChanges();

    expect(component.isLoading).toBeTruthy();
  });
});
