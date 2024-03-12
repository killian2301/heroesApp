import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { heroMock } from '../../../../testing/heroes.mock';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroFormComponent,
        ReactiveFormsModule,
        ButtonComponent,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    component.heroToEdit = heroMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a hero when form is submitted correctly', () => {
    component.heroForm.patchValue(heroMock);
    component.heroForm.get('name')?.setValue('testHero');

    fixture.detectChanges();

    const spy = jest.spyOn(component.heroSubmitted, 'emit');
    component.onSubmit();
    const expectedHero = { ...heroMock, name: 'testHero' };

    expect(spy).toHaveBeenCalledWith(expectedHero);
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
    component.heroToEdit = heroMock;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.heroForm.get('name')?.value).toBe('Batman');
  });
});
