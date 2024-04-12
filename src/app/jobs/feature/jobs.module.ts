import { NgModule } from '@angular/core';
import { JobsRoutingModule } from './jobs-routing.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { JobFormComponent } from '../ui/job-form/job-form.component';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobSkillsComponent } from '@shared/ui/job-skills/job-skills.component';
import { SidebarDialogWrapperComponent } from '@shared/ui/sidebar-dialog-wrapper/sidebar-dialog-wrapper.component';
import { MatMenuModule } from '@angular/material/menu';
import { FilterJobsComponent } from './filter-jobs/filter-jobs.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { PageHeadComponent } from '@shared/ui/page-head/page-head.component';
import { JobsTableComponent } from '../ui/jobs-table/jobs-table.component';
import { FilterBarComponent } from '@shared/ui/filter-bar/filter-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { JobStatusComponent } from '@shared/ui/job-status/job-status.component';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';

@NgModule({
  declarations: [
    ViewJobsComponent,
    EditJobDialogComponent,
    CreateJobDialogComponent,
    FilterJobsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JobsRoutingModule,
    MatTableModule,
    MatIcon,
    MatButtonModule,
    JobFormComponent,
    JobSkillsComponent,
    SidebarDialogWrapperComponent,
    MatMenuModule,
    MatChipsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    PageHeadComponent,
    JobsTableComponent,
    FilterBarComponent,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    JobStatusComponent,
  ],
})
export class JobsModule {}
