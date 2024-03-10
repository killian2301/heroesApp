import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero } from '../../../../core/models/hero.model';
import { HeroTileComponent } from './hero-tile.component';

describe('HeroTileComponent', () => {
  let component: HeroTileComponent;
  let fixture: ComponentFixture<HeroTileComponent>;
  const heroes: Hero[] = [{ id: 1, name: 'spiderman' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show capitalize hero name', () => {
    component.hero = heroes[0];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Spiderman');
  });
});
