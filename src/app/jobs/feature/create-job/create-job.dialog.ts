import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../../data-access/jobs.service';
import { JobViewModel } from '../../data-access/jobs';
import { Subject, takeUntil } from 'rxjs';

@Component({
  template: `
    <app-sidebar-dialog-wrapper title="Create Job Ad" (closeDialog)="cancel()">
      <app-job-form (submitJobAd)="createJobAd($event)"></app-job-form>
    </app-sidebar-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateJobDialogComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  constructor(
    private dialogRef: MatDialogRef<CreateJobDialogComponent>,
    private service: JobsService,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  createJobAd($event: Partial<JobViewModel>) {
    this.service
      .createJob($event as JobViewModel)
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
