import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../../../../core/models/hero.model';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  const hero: Hero = { id: 1, name: 'spiderman' };

  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hero name in capitalize letters', () => {
    component.hero = hero;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('SPIDERMAN');
  });

  it('should return to hero list once hero is deleted', () => {
    const spy = jest.spyOn(router, 'navigate');
    component.onHeroDeleted(true);
    expect(spy).toHaveBeenCalledWith(['/heroes']);
  });
});
