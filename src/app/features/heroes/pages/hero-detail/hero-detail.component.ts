import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  hero?: Hero;
  constructor(private heroService: HeroService, private route: ActivatedRoute) {
    this.route.params
      .pipe(switchMap((params) => this.heroService.getHero(params['id'])))
      .subscribe((hero) => (this.hero = hero));
  }
}
