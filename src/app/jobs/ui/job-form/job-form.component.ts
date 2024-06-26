import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { JobAdDto, JobAdStatus } from '@appTypes/jobs';
import {
  MatChipGrid,
  MatChipInput,
  MatChipInputEvent,
  MatChipRow,
} from '@angular/material/chips';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { JobViewModel } from '../../data-access/jobs';
import { debounceTime, Subject, takeUntil } from 'rxjs';

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
    MatHint,
    MatError,
    NgIf,
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
        <mat-error *ngIf="form.get('title')?.hasError('required')"
          >Please provide a Job Title</mat-error
        >
        <mat-error *ngIf="form.get('title')?.hasError('sameName')"
          >Job with that Title already exists</mat-error
        >
      </mat-form-field>
      <mat-form-field class="example-full-width">
        <mat-label>Description</mat-label>
        <input
          matInput
          formControlName="description"
          placeholder="Enter a job description"
        />
        <mat-error *ngIf="form.get('description')?.hasError('required')"
          >Please provide a description</mat-error
        >
        <mat-error *ngIf="form.get('description')?.hasError('minlength')"
          >Please provide description longer than 10 characters</mat-error
        >
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
          placeholder="Add skills"
          [matChipInputFor]="chipList"
          (matChipInputTokenEnd)="addSkill($event); chipsInput.value = ''"
        />
        <mat-hint>Press RETURN key after each skill to add the skill</mat-hint>
      </mat-form-field>

      <div class="flex justify-end mt-4">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobFormComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  public editMode = false;
  public form = this.fb.group<IJobForm>({
    title: this.fb.control<string>('', Validators.required),
    description: this.fb.control<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    skills: this.fb.control<string[]>([]),
  });

  @Input() existingNames!: string[] | null;

  @Input() set initialValue(value: JobViewModel | undefined) {
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

  constructor(private fb: NonNullableFormBuilder) {
    this.listenToTitleChanges();
  }

  handleSubmit(jobStatus: JobAdStatus) {
    if (this.form.valid) {
      this.form.disable();
      this.submitJobAd.emit({
        ...this.form.getRawValue(),
        status: jobStatus,
      });
    }
  }

  addSkill({ value }: MatChipInputEvent) {
    if (value && value !== '') {
      const controlValue = [...this.skillsControl.value];
      this.skillsControl.patchValue([...controlValue, value]);
    }
  }

  removeSkill(skill: string) {
    this.skillsControl.patchValue([
      ...this.skillsControl.value.filter((e: string) => e !== skill),
    ]);
  }

  private listenToTitleChanges() {
    this.form
      .get('title')
      ?.valueChanges.pipe(debounceTime(300), takeUntil(this._destroy$))
      .subscribe((title) => {
        if (this.existingNames && this.existingNames.includes(title)) {
          this.form.get('title')?.setErrors({ sameName: true });
        } else {
          this.form.get('title')?.setErrors(null);
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
