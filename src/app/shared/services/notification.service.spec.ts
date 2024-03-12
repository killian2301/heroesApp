import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a success snackbar', () => {
    const spy = jest.spyOn(snackBar, 'open');
    const message = 'Success message';
    service.success(message);
    expect(spy).toHaveBeenCalledWith(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
    });
  });

  it('should open an error snackbar', () => {
    const spy = jest.spyOn(snackBar, 'open');
    const message = 'Error message';
    service.error(message);
    expect(spy).toHaveBeenCalledWith(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
    });
  });
});
