import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-no-heroes-found',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './no-heroes-found.component.html',
  styleUrl: './no-heroes-found.component.scss',
})
export class NoHeroesFoundComponent {}
