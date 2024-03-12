import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../../../../core/models/hero.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  const hero: Hero = {
    id: 1,
    name: 'spiderman',
    work: { occupation: '' },
    appearance: { gender: '', race: '' },
  };
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFormComponent, ReactiveFormsModule, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    component.heroToEdit = hero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a hero when form is submitted', () => {
    component.heroForm.get('name')?.setValue('spiderman');
    fixture.detectChanges();

    const spy = jest.spyOn(component.heroSubmitted, 'emit');
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith({ id: '', name: 'spiderman' });
  });

  it('name field should be required', () => {
    const name = component.heroForm.get('name');
    name?.setValue('');
    expect(name?.valid).toBeFalsy();
  });

  it('should create an empty form when no hero is passed', () => {
    component.heroToEdit = undefined;
    fixture.detectChanges();
    expect(component.heroForm.get('name')?.value).toBe('');
  });

  it('should fill form with hero data when hero is passed', () => {
    component.heroToEdit = hero;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.heroForm.get('name')?.value).toBe('spiderman');
  });
});
