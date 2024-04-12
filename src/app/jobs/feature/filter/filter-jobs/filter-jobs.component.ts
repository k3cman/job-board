import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl } from '@angular/forms';
import { IFilter } from '../../../../types/filter';

interface IJobFilterForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  skills: FormControl<string | null>;
  status: FormControl<string | null>;
}
@Component({
  template: `
    <app-sidebar-dialog-wrapper title="Filter job ads" (closeDialog)="close()">
      <form
        [formGroup]="form"
        (ngSubmit)="handleSubmit()"
        class="flex flex-col"
      >
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

          <input
            formControlName="skills"
            matInput
            placeholder="Add skills by typing each one and pressing enter. Click on chip to delete a skill"
          />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option
              [value]="status"
              *ngFor="let status of availableStatuses"
            >
              {{ status }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <div class="flex justify-end">
          <button mat-stroked-button class="mr-2" (click)="clearFilters()">
            Clear
          </button>
          <button mat-stroked-button color="primary" type="submit">
            Apply Filters
          </button>
        </div>
      </form>
    </app-sidebar-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterJobsComponent {
  availableStatuses = ['draft', 'published', 'archived'];
  public form = this.fb.group<IJobFilterForm>({
    title: this.fb.control<string | null>(null),
    description: this.fb.control<string | null>(null),
    skills: this.fb.control<string | null>(null),
    status: this.fb.control<string | null>(null),
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FilterJobsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFilter,
  ) {
    this.form.patchValue({
      ...data,
    });
  }

  close() {
    this.dialogRef.close();
  }

  clearFilters() {
    this.form.patchValue({
      title: null,
      description: null,
      skills: null,
      status: null,
    });
    this.dialogRef.close(this.form.getRawValue());
  }

  handleSubmit() {
    this.dialogRef.close(this.form.getRawValue());
  }
}
