import { JobFormComponent } from '../job-form/job-form.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { JobsTableComponent } from './jobs-table.component';
import { JobSkillsComponent } from '../../../shared/ui/job-skills/job-skills.component';
import { JobStatusComponent } from '../../../shared/ui/job-status/job-status.component';
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
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { FormBuilder } from '@angular/forms';

describe('JobsTableComponent', () => {
  let component: JobsTableComponent;
  let fixture: ComponentFixture<JobsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        JobSkillsComponent,
        JobStatusComponent,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatMenu,
        MatMenuItem,
        MatRow,
        MatRowDef,
        MatTable,
        MatHeaderCellDef,
        MatMenuTrigger,
        NgIf,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsTableComponent);
    component = fixture.componentInstance;

    component.columns = ['title', 'description', 'skills', 'status', 'actions'];
    component.tableData = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should have proper columns', () => {
    expect(component.columns).toEqual([
      'title',
      'description',
      'skills',
      'status',
      'actions',
    ]);
  });
});
