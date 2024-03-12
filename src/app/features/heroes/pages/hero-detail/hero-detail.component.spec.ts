import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HeaderComponent } from '../../../../layout/header/header.component';
import { heroMock } from '../../../../testing/heroes.mock';
import { HeroService } from '../../services/hero.service';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let router: Router;
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        HeaderComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
          },
        },
        {
          provide: HeroService,
          useValue: {
            getHero: jest.fn().mockReturnValue(of(heroMock)),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    heroService = TestBed.inject(HeroService);
    component.hero = heroMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return to hero list once hero is deleted', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.onHeroDeleted(true);
    expect(spy).toHaveBeenCalledWith(['/heroes']);
  });

  it('should fetch and display hero data', () => {
    component.ngOnInit();
    expect(component.hero).toEqual(heroMock);
  });

  it('should log an error message if fetching hero fails', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    jest
      .spyOn(heroService, 'getHero')
      .mockReturnValue(throwError(() => new Error('Error fetching hero')));

    component.ngOnInit();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching hero:',
      expect.any(Error),
    );
  });
});
