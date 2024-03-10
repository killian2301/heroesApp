import { Component, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hero } from '../../../../core/models/hero.model';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
})
export class HeroFormComponent {
  heroForm!: FormGroup;
  heroSubmitted: EventEmitter<Hero> = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.heroSubmitted.emit(this.heroForm.value);
  }

  createForm() {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
}
