import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handle(error: any, message: string, defaultValue?: any) {
    console.error(error);
    if (defaultValue) {
      return of(defaultValue);
    }
    throw new Error(message);
  }
}
