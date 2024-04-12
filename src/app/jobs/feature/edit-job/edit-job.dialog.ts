import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobAdDto } from '../../../types/jobs';
import { JobsService } from '../../data-access/jobs.service';
import { Subject, takeUntil } from 'rxjs';
import { JobViewModel } from '../../data-access/jobs';

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
    private service: JobsService,
  ) {}

  close() {
    this.dialogRef.close();
  }

  handleSubmit(updatedJob: Partial<JobViewModel>) {
    const payload = { ...this.data, ...updatedJob };
    this.service
      .updateJob(payload)
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.dialogRef.close(data);
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
