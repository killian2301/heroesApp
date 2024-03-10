import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a hero when form is submitted', () => {
    component.heroForm.setValue({ name: 'spiderman' });
    fixture.detectChanges();

    const spy = jest.spyOn(component.heroSubmitted, 'emit');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith({ name: 'spiderman' });
  });

  it('name field should be required', () => {
    const name = component.heroForm.get('name');
    name?.setValue('');
    expect(name?.valid).toBeFalsy();
  });
});
