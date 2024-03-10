import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Hero } from '../../../../core/models/hero.model';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [UpperCasePipe, AsyncPipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.scss',
})
export class HeroDetailComponent {
  hero?: Observable<Hero>;
  constructor(
    private heroService: HeroService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((params) => {
      this.hero = this.heroService.getHero(params['id']);
    });
  }
}
