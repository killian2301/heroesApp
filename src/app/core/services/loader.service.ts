import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  counter = 0;
  show() {
    if (this.counter === 0) {
      this.counter++;
      this.isLoading.next(true);
    }
  }
  hide() {
    if (this.counter >= 1) {
      this.counter = 0;
      this.isLoading.next(false);
    }
  }
}
