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
    console.log(this.counter);
  }
  hide() {
    if (this.counter >= 1) {
      this.counter = 0;
      setTimeout(() => {
        this.isLoading.next(false);
      }, 200);
    }
  }
}
