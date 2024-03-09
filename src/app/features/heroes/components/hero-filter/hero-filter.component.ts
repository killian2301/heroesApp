import { Component } from '@angular/core';
import { HeroFilterService } from '../../services/hero-filter.service';

@Component({
  selector: 'app-hero-filter',
  standalone: true,
  imports: [],
  templateUrl: './hero-filter.component.html',
  styleUrl: './hero-filter.component.scss',
})
export class HeroFilterComponent {
  constructor(private heroFilterService: HeroFilterService) {}

  filter(query: string) {
    this.heroFilterService.filter(query);
  }
}
