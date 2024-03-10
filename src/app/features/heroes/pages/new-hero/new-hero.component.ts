import { Component } from '@angular/core';
import { Hero } from '../../../../core/models/hero.model';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.scss',
})
export class NewHeroComponent {
  constructor(private heroService: HeroService) {}

  onSubmit(hero: Omit<Hero, 'id'>) {
    this.heroService.saveHero(hero).subscribe((hero) => {
      console.log(hero);
    });
  }
}
