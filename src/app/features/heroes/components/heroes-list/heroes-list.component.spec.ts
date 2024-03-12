import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeroesListComponent } from './heroes-list.component';
describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let router: Router;

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
});
