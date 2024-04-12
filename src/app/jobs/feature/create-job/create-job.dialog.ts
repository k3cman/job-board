import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobViewModel } from '../../data-access/jobs';
import { Subject, takeUntil } from 'rxjs';
import { JobsStore } from '../../store/job.store';

@Component({
  template: `
    <app-sidebar-dialog-wrapper title="Create Job Ad" (closeDialog)="cancel()">
      <app-job-form
        (submitJobAd)="createJobAd($event)"
        [existingNames]="jobNames$ | async"
      ></app-job-form>
    </app-sidebar-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateJobDialogComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  jobNames$ = this.store.jobNames$;
  constructor(
    private dialogRef: MatDialogRef<CreateJobDialogComponent>,
    private store: JobsStore,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  createJobAd(job: Partial<JobViewModel>) {
    this.store.createJobAd(job);
    this.store.actionInProgress$
      .pipe(takeUntil(this._destroy$))
      .subscribe((inProgress) => {
        if (!inProgress) {
          this.dialogRef.close();
        }
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
