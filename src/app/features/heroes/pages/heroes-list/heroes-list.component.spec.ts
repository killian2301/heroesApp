import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesListComponent],
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
});
