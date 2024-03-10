import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from '../../../../core/models/hero.model';
import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let router: Router;
  const heroes: Hero[] = [
    { id: 1, name: 'spiderman' },
    { id: 2, name: 'Batman' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroesListComponent,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an empty message when there is no heroes in the list', () => {
    const emptyMessage = 'No heroes found.';
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(emptyMessage);
  });

  it('should show a list of heroes name when the list is not empty', () => {
    component.heroes = heroes;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul').textContent).toContain('Spiderman');
    expect(compiled.querySelector('ul').textContent).toContain('Batman');
  });

  xit('should be able to click on a hero and navigate to the hero detail page', async () => {
    component.heroes = heroes;
    fixture.detectChanges();
    const spy = jest.spyOn(router, 'navigate');
    const heroLink = fixture.debugElement.query(
      By.css('app-hero-tile :first-child')
    ).nativeElement;
    heroLink.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(['/heroes', heroes[0].id]);
  });
});
