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
import {JobStatusComponent} from "../../shared/ui/job-status/job-status.component";
import {JobSkillsComponent} from "../../shared/ui/job-skills/job-skills.component";
import {SidebarDialogWrapperComponent} from "../../shared/ui/sidebar-dialog-wrapper/sidebar-dialog-wrapper.component";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";

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
    JobStatusComponent,
    JobSkillsComponent,
    SidebarDialogWrapperComponent,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
})
export class JobsModule {}
