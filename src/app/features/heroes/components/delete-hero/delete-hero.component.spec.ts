import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { DeleteHeroConfirmationDialogComponent } from '../delete-hero-confirmation-dialog/delete-hero-confirmation-dialog.component';
import { DeleteHeroComponent } from './delete-hero.component';

describe('DeleteHeroComponent', () => {
  let component: DeleteHeroComponent;
  let fixture: ComponentFixture<DeleteHeroComponent>;
  let dialog: MatDialog;
  let heroService: HeroService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteHeroComponent, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(),
          },
        },
        {
          provide: HeroService,
          useValue: {
            deleteHero: jest.fn().mockReturnValue(of({})),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteHeroComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    heroService = TestBed.inject(HeroService);
    component.hero = { id: 1, name: 'Spiderman' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the confirmation dialog when onDeleteHero is called', () => {
    const dialogSpy = jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as any);

    component.onDeleteHero();

    expect(dialogSpy).toHaveBeenCalledWith(
      DeleteHeroConfirmationDialogComponent,
      {
        data: { hero: component.hero },
      },
    );
  });

  it('should emit heroDeleted true when dialog confirms deletion', () => {
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(true),
    } as any);

    const emitSpy = jest.spyOn(component.heroDeleted, 'emit');

    component.onDeleteHero();
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should not emit heroDeleted if dialog is dismissed', () => {
    jest.spyOn(dialog, 'open').mockReturnValue({
      afterClosed: () => of(false),
    } as any);

    const emitSpy = jest.spyOn(component.heroDeleted, 'emit');

    component.onDeleteHero();

    expect(emitSpy).not.toHaveBeenCalled();
  });
});
