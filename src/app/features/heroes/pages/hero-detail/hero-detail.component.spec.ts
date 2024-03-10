import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroDetailComponent } from './hero-detail.component';

describe('HeroDetailComponent', () => {
  const hero: Hero = { id: 1, name: 'spiderman' };

  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let activatedRouteMock: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
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
  xit('should be able delete a hero', () => {
    const spy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    component.hero = hero;
    fixture.detectChanges();
    component.onDeleteHero();
    expect(spy).toHaveBeenCalled();
  });
});
