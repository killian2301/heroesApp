import { Component } from '@angular/core';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [HeroFormComponent],
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.scss',
})
export class NewHeroComponent {
  onSubmit(hero: Event) {
    console.log(hero);
  }
}
