import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JobAdDto, JobAdStatus } from '../../../types/jobs';
import {
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRow,
} from '@angular/material/chips';
import { NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

interface IJobForm {
  title: FormControl<string>;
  description: FormControl<string>;
  skills: FormControl<string[]>;
}

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatChipInput,
    NgForOf,
    MatChipGrid,
    MatIcon,
    MatChipRow,
  ],
  template: `
    <form [formGroup]="form" class="flex flex-col">
      <mat-form-field>
        <mat-label>Title</mat-label>
        <input
          matInput
          formControlName="title"
          placeholder="Enter a job title"
        />
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Description</mat-label>
        <input
          matInput
          formControlName="description"
          placeholder="Enter a job description"
        />
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Skills</mat-label>
        <mat-chip-grid #chipList formControlName="skills">
          <mat-chip-row
            [removable]="true"
            *ngFor="let chip of skillsControl.value"
            (click)="removeSkill(chip)"
          >
            <div class="flex items-center justify-between">
              {{ chip }}
            </div>
          </mat-chip-row>
        </mat-chip-grid>
        <input
          #chipsInput
          matInput
          placeholder="Add skills by typing each one and pressing enter. Click on chip to delete a skill"
          [matChipInputFor]="chipList"
          (matChipInputTokenEnd)="addSkill($event); chipsInput.value = ''"
        />
      </mat-form-field>

      <div class="flex justify-end">
        <button class="mr-2" mat-stroked-button (click)="handleSubmit('draft')">
          {{ editMode ? 'Update' : 'Create' }}
        </button>
        <button
          mat-stroked-button
          color="primary"
          (click)="handleSubmit('published')"
        >
          {{ editMode ? 'Update' : 'Create' }} and Publish
        </button>
      </div>
    </form>
  `,
  styleUrl: './job-form.component.scss',
})
export class JobFormComponent {
  public form = this.fb.group<IJobForm>({
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    skills: this.fb.control<string[]>([]),
  });

  public editMode = false;

  @Input() set initialValue(value: JobAdDto | undefined) {
    if (value) {
      this.editMode = true;
      this.form.patchValue({
        ...value,
      });
    }
  }

  @Output() readonly submitJobAd = new EventEmitter<Partial<JobAdDto>>();

  get skillsControl(): AbstractControl {
    return this.form.get('skills') as AbstractControl;
  }

  constructor(private fb: NonNullableFormBuilder) {}

  handleSubmit(jobStatus: JobAdStatus) {
    if (this.form.valid) {
      this.submitJobAd.emit({
        ...this.form.getRawValue(),
        status: jobStatus,
      });
    }
  }

  addSkill($event: MatChipInputEvent) {
    const controlValue = [...this.skillsControl.value];
    this.skillsControl.patchValue([...controlValue, $event.value]);
  }

  removeSkill(skill: string) {
    this.skillsControl.patchValue([
      ...this.skillsControl.value.filter((e: string) => e !== skill),
    ]);
  }
}
