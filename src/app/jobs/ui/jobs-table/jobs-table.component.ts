import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { JobViewModel } from '../../data-access/jobs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-jobs-table',
  standalone: true,
  template: `
    <table mat-table [dataSource]="tableData">
      <ng-container matColumnDef="title">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let element">{{ element.title }}</td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let element">
          {{ element.description }}
        </td>
      </ng-container>

      <ng-container matColumnDef="skills">
        <th mat-header-cell *matHeaderCellDef>Skills</th>
        <td mat-cell *matCellDef="let element">
          <app-job-skills [skills]="element.skills"></app-job-skills>
        </td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let element">
          <app-job-status [status]="element.status" />
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>

          <mat-menu #menu="matMenu">
            <button
              mat-menu-item
              (click)="statusChange.emit(element)"
              *ngIf="element.status !== 'archived'"
            >
              {{ element.status === 'draft' ? 'Publish Job' : 'Archive Job' }}
            </button>
            <button mat-menu-item (click)="editJob.emit(element)">
              Edit Job
            </button>
            <button mat-menu-item (click)="deleteJob.emit(element)">
              Delete Job
            </button>
          </mat-menu>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns"></tr>
    </table>
  `,
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
  styleUrl: './jobs-table.component.scss',
})
export class JobsTableComponent {
  @Input() columns!: string[];
  @Input() tableData!: JobViewModel[];
  @Output() statusChange = new EventEmitter<JobViewModel>();
  @Output() editJob = new EventEmitter<JobViewModel>();
  @Output() deleteJob = new EventEmitter<JobViewModel>();
}
