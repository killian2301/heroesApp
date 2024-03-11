import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Hero App';
  loading = false;
  isLoading$ = this.loaderService.isLoading$;
  isLoading: boolean = false;
  destroy$ = new Subject();
  constructor(
    private loaderService: LoaderService,
    private cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loaderService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
