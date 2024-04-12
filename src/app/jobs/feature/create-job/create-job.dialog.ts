import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JobsService } from '../../data-access/jobs.service';
import { JobAdDto } from '../../../types/jobs';

@Component({
  template: `
    <app-sidebar-dialog-wrapper title="Create Job Ad" (closeDialog)="cancel()">
      <app-job-form (submitJobAd)="createJobAd($event)"></app-job-form>
    </app-sidebar-dialog-wrapper>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateJobDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CreateJobDialogComponent>,
    private service: JobsService,
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  createJobAd($event: Partial<JobAdDto>) {
    console.log($event);
    this.service.createJob($event as JobAdDto).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }
}
