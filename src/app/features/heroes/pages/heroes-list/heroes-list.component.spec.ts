import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListComponent, HttpClientTestingModule],
    }).compileComponents();

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
    component.heroes = [{ name: 'Spiderman' }, { name: 'Batman' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ul').textContent).toContain('Spiderman');
    expect(compiled.querySelector('ul').textContent).toContain('Batman');
  });
});
