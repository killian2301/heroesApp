import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Hero } from '../../../../core/models/hero.model';
import { DeleteHeroConfirmationDialogComponent } from './delete-hero-confirmation-dialog.component';

describe('DeleteHeroConfirmationDialogComponent', () => {
  let component: DeleteHeroConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteHeroConfirmationDialogComponent>;
  const hero: Hero = { id: 1, name: 'spiderman' };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeleteHeroConfirmationDialogComponent,
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHeroConfirmationDialogComponent);
    component = fixture.componentInstance;
    component.hero = hero;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
