import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobAdDto } from '../../../types/jobs';
import { JobsService } from '../../data-access/jobs.service';

@Component({
  template: `
    <app-job-form
      [initialValue]="data ?? undefined"
      (cancel)="close()"
      (submitJobAd)="handleSubmit($event)"
    ></app-job-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJobDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditJobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobAdDto,
    private service: JobsService,
  ) {}

  close() {
    this.dialogRef.close();
  }

  handleSubmit(updatedJob: Partial<JobAdDto>) {
    const payload = { ...this.data, ...updatedJob };
    this.service.updateJob(payload).subscribe((data) => {
      this.dialogRef.close(data);
    });
  }
}
