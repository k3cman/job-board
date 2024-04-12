import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { JobViewModel } from '../../data-access/jobs';
import { JobsStore } from '../../store/job.store';

@Component({
  template: `
    <app-sidebar-dialog-wrapper title="Update Job Ad" (closeDialog)="close()">
      <app-job-form
        [initialValue]="data"
        (submitJobAd)="handleSubmit($event)"
      ></app-job-form>
    </app-sidebar-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJobDialogComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  constructor(
    private dialogRef: MatDialogRef<EditJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobViewModel,
    private store: JobsStore,
  ) {}

  close() {
    this.dialogRef.close();
  }

  handleSubmit(updatedJob: Partial<JobViewModel>) {
    const payload = { ...this.data, ...updatedJob };
    this.store.editJob(payload);
    this.store.actionInProgress$
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.dialogRef.close(payload);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
