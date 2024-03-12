import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, config: MatSnackBarConfig) {
    return this.snackBar.open(message, '', config);
  }

  error(message: string) {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 3000,
    };
    return this.openSnackBar(message, config);
  }
  success(message: string) {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000,
    };
    return this.openSnackBar(message, config);
  }
}
