import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HeroFilterService } from '../../services/hero-filter.service';

@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero-filter.component.html',
  styleUrl: './hero-filter.component.scss',
})
export class HeroFilterComponent implements OnInit, OnDestroy {
  filterControl: FormControl = new FormControl('');
  unsubscriber: Subject<boolean> = new Subject();
  constructor(private heroFilterService: HeroFilterService) {}

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((query) => this.filter(query));
  }

  filter(query: string) {
    this.heroFilterService.filter(query);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(true);
    this.unsubscriber.complete();
  }
}
