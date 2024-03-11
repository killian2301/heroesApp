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
import { Hero } from '../../../../core/models/hero.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent implements OnChanges {
  @Input() heroToEdit!: Hero;
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
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }
}
