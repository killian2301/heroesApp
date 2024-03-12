import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HERO_IMAGE_PLACEHOLDER } from '../../../../core/constants/hero.constants';
import { Hero } from '../../../../core/models/hero.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent implements OnChanges {
  @Input() heroToEdit?: Hero;
  @Output() heroSubmitted: EventEmitter<Hero> = new EventEmitter();
  heroForm: FormGroup = this.getEmptyForm();

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    if (this.heroToEdit) {
      this.fillFormWith(this.heroToEdit);
    }
  }

  onSubmit() {
    this.heroSubmitted.emit(this.heroForm.value);
  }
  fillFormWith(hero: Hero) {
    this.heroForm.patchValue(hero);
  }
  getEmptyForm(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      biography: this.fb.group({
        publisher: ['', Validators.required],
      }),
      work: this.fb.group({
        occupation: [''],
      }),
      appearance: this.fb.group({
        gender: ['', Validators.required],
        race: ['', Validators.required],
      }),
      images: this.fb.group({
        xs: [HERO_IMAGE_PLACEHOLDER],
        sm: [HERO_IMAGE_PLACEHOLDER],
        md: [HERO_IMAGE_PLACEHOLDER],
        lg: [HERO_IMAGE_PLACEHOLDER],
      }),
    });
  }
}
