import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { NewHeroComponent } from './new-hero.component';

describe('NewHeroComponent', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;
  let router: Router;
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHeroComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: HeroService, useValue: { saveHero: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    heroService = TestBed.inject(HeroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('New Hero');
  });

  it('should have a form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should return to heroes list once submitted successfully', () => {
    jest
      .spyOn(heroService, 'saveHero')
      .mockReturnValue(of({ id: 1, name: 'Spiderman' }));
    const spy = jest.spyOn(router, 'navigate');
    component.onSubmit({ name: 'Spiderman' });
    expect(spy).toHaveBeenCalledWith(['/heroes']);
  });
});
