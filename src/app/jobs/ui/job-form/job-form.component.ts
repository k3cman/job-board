import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JobAdDto } from '../../../types/jobs';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatLabel, MatButton],
  template: `
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input matInput formControlName="title" />
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>description</mat-label>
        <input matInput formControlName="description" />
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>skills</mat-label>
        <input matInput formControlName="skills" />
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>status</mat-label>
        <input matInput formControlName="status" />
      </mat-form-field>

      <button mat-button (cancel)="cancel.emit()">Cancel</button>
      <button mat-button type="submit">Submit</button>
    </form>
  `,
  styleUrl: './job-form.component.scss',
})
export class JobFormComponent {
  public form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    skills: [''],
    status: [null],
  });

  @Input() set initialValue(value: JobAdDto) {
    this.form.patchValue({
      ...value,
    });
  }

  @Output() readonly cancel = new EventEmitter<void>();
  @Output() readonly submitJobAd = new EventEmitter<JobAdDto>();

  constructor(private fb: UntypedFormBuilder) {}

  handleSubmit() {
    if (this.form.valid) {
      this.submitJobAd.emit(this.form.getRawValue());
    }
  }
}
