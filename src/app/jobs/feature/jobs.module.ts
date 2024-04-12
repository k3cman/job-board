import { NgModule } from '@angular/core';
import { JobsPageComponent } from './jobs.page';
import { JobsRoutingModule } from './jobs-routing.module';
import { CommonModule, NgOptimizedImage } from '@angular/common';
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
import {
  MatButton,
  MatIconButton,
  MatMiniFabButton,
} from '@angular/material/button';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { JobFormComponent } from '../ui/job-form/job-form.component';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobStatusComponent } from '../../shared/ui/job-status/job-status.component';
import { JobSkillsComponent } from '../../shared/ui/job-skills/job-skills.component';
import { SidebarDialogWrapperComponent } from '../../shared/ui/sidebar-dialog-wrapper/sidebar-dialog-wrapper.component';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { FilterJobsComponent } from './filter/filter-jobs/filter-jobs.component';
import {
  MatChip,
  MatChipGrid,
  MatChipInput,
  MatChipRow,
  MatChipSet,
} from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { PageHeadComponent } from '../../shared/ui/page-head/page-head.component';
import { JobsTableComponent } from '../ui/jobs-table/jobs-table.component';
import { FilterBarComponent } from '../../shared/ui/filter-bar/filter-bar.component';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    JobsPageComponent,
    EditJobDialogComponent,
    CreateJobDialogComponent,
    FilterJobsComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
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
    MatButton,
    MatChipGrid,
    MatChipInput,
    MatChipRow,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatChip,
    MatChipSet,
    PageHeadComponent,
    JobsTableComponent,
    FilterBarComponent,
    MatProgressSpinnerModule,
    NgOptimizedImage,
  ],
})
export class JobsModule {}
