import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeroFilterComponent } from '../../components/hero-filter/hero-filter.component';
import { HeroesListComponent } from '../../components/heroes-list/heroes-list.component';
import { HeroFilterService } from '../../services/hero-filter.service';
@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    HeroFilterComponent,
    HeroesListComponent,
  ],
  providers: [HeroFilterService],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent {}
