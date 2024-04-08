import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-job',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field class="example-full-width">
        <mat-label>Title</mat-label>
        <input matInput formControlName="title">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>description</mat-label>
        <input matInput formControlName="description">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>skills</mat-label>
        <input matInput formControlName="skills">
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>status</mat-label>
        <input matInput formControlName="status">
      </mat-form-field>

      <button mat-button type="submit">Save</button>
    </form>
  `,
  styleUrl: './edit-job.component.scss'
})
export class EditJobComponent {

  form = this.fb.group({
    title: ['', [Validators.required]],
    description: [''],
    skills: [''],
    status: [null]
  })
constructor(
  private fb: UntypedFormBuilder,
  public dialogRef: MatDialogRef<EditJobComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
) {
  if(data){
    this.form.patchValue({
      title: data.title,
      description: data.description,
      skills: JSON.stringify(data.skills),
      status: data.status
    })
  }
}

  submit() {
    console.log('Submit')
  }
}
