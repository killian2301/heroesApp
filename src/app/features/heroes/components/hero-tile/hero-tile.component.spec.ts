import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { heroMock } from '../../../../testing/heroes.mock';
import { HeroTileComponent } from './hero-tile.component';

describe('HeroTileComponent', () => {
  let component: HeroTileComponent;
  let fixture: ComponentFixture<HeroTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTileComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTileComponent);
    component = fixture.componentInstance;
    component.hero = heroMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show capitalize hero name', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.mat-mdc-card-title').textContent).toContain(
      'Batman',
    );
  });
});
