import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoHeroesFoundComponent } from './no-heroes-found.component';

describe('NoHeroesFoundComponent', () => {
  let component: NoHeroesFoundComponent;
  let fixture: ComponentFixture<NoHeroesFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoHeroesFoundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoHeroesFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
