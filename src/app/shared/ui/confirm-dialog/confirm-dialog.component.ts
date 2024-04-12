import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { JobViewModel } from '../../../jobs/data-access/jobs';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButton, MatDialogTitle, MatDialogContent, MatDialogActions],
  template: `
    <h2 mat-dialog-title>Confirm delete action</h2>
    <mat-dialog-content>
      Are you sure you want to delete {{ data.title }} Job Ad
    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button (click)="handleConfirmation(false)">Cancel</button>
      <button mat-button (click)="handleConfirmation(true)">Confirm</button>
    </mat-dialog-actions>
  `,
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  @Output() decline = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobViewModel,
  ) {}

  handleConfirmation(confirmed: boolean) {
    this.dialogRef.close(confirmed);
  }
}
