import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';
import { HeroFilterService } from '../../services/hero-filter.service';
@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './hero-filter.component.html',
  styleUrl: './hero-filter.component.scss',
})
export class HeroFilterComponent implements OnInit, OnDestroy {
  filterControl: FormControl = new FormControl('');
  private destroy$: Subject<boolean> = new Subject();
  constructor(private heroFilterService: HeroFilterService) {}

  ngOnInit() {
    this.listenForFilterChanges();
  }

  private listenForFilterChanges() {
    this.filterControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => this.filter(query));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private filter(query: string) {
    this.heroFilterService.filter(query);
  }
}
