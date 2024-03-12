import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { heroMock } from '../../../../testing/heroes.mock';
import { HeroService } from '../../services/hero.service';
import { NewHeroComponent } from './new-hero.component';

describe('NewHeroComponent', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;
  let router: Router;
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewHeroComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: HeroService, useValue: { saveHero: jest.fn() } }],
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

  it('should have a form', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should return to heroes list once submitted successfully', () => {
    jest.spyOn(heroService, 'saveHero').mockReturnValue(of(heroMock));
    const spy = jest.spyOn(router, 'navigate');
    component.onSubmit(heroMock);
    expect(spy).toHaveBeenCalledWith(['/heroes']);
  });
});
