import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  template: ` <app-job-form></app-job-form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditJobDialogComponent {
  constructor(private dialogRef: DialogRef) {}
}
