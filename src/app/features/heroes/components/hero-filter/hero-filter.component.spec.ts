import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFilterService } from '../../services/hero-filter.service';
import { HeroFilterComponent } from './hero-filter.component';

describe('HeroFilterComponent', () => {
  let component: HeroFilterComponent;
  let fixture: ComponentFixture<HeroFilterComponent>;
  let heroFilterService: HeroFilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [HeroFilterService],
      imports: [HeroFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFilterComponent);
    component = fixture.componentInstance;
    heroFilterService = TestBed.inject(HeroFilterService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes', () => {
    const spy = jest.spyOn(heroFilterService, 'filter');
    component.filter('Spider');
    expect(spy).toHaveBeenCalledWith('Spider');
  });
});
