import { NgModule } from '@angular/core';
import { JobsPageComponent } from './jobs.page';
import { JobsRoutingModule } from './jobs-routing.module';
import { AsyncPipe, JsonPipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { JobFormComponent } from '../ui/job-form/job-form.component';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';

@NgModule({
  declarations: [
    JobsPageComponent,
    EditJobDialogComponent,
    CreateJobDialogComponent,
  ],
  imports: [
    JobsRoutingModule,
    AsyncPipe,
    JsonPipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatMiniFabButton,
    MatRow,
    MatRowDef,
    MatTable,
    JobFormComponent,
    MatHeaderCellDef,
  ],
})
export class JobsModule {}
