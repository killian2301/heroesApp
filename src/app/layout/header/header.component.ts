import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeroFilterComponent } from '../../features/heroes/components/hero-filter/hero-filter.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    HeroFilterComponent,
    ButtonComponent,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title!: string;
  @Input() canGoBack: boolean = false;
}
