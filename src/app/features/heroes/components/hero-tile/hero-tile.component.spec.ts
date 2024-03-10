import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTileComponent } from './hero-tile.component';

describe('HeroTileComponent', () => {
  let component: HeroTileComponent;
  let fixture: ComponentFixture<HeroTileComponent>;

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
    component.hero = { name: 'spiderman' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Spiderman');
  });
});
