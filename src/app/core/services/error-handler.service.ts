import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handle(error: any, message: string, defaultValue?: any) {
    console.error(error);
    if (defaultValue) {
      return of(defaultValue);
    }
    this.notificationService.error(message);
    throw new Error(message);
  }
}
