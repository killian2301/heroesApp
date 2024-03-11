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
  heroForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.heroForm = this.createForm();
  }

  onSubmit() {
    this.heroSubmitted.emit(this.heroForm.value);
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [this.heroToEdit?.id || '', Validators.required],
      name: [this.heroToEdit?.name || '', Validators.required],
    });
  }
}
