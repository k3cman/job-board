import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JobsService } from '../data-access/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobsStore } from '../store/job.store';
import { JobAdDto } from '../../types/jobs';
import { FilterJobsComponent } from './filter/filter-jobs/filter-jobs.component';
import { Router } from '@angular/router';

@Component({
  template: `
    <div>
      <div class="flex items-center justify-end p-2">
        <button mat-stroked-button (click)="openFilter()" class="mr-4">
          <mat-icon>filter_alt</mat-icon>
          Filter
        </button>
        <button mat-stroked-button color="primary" (click)="createJob()">
          <mat-icon>add</mat-icon>
          Create Job Ad
        </button>
      </div>
      <table mat-table [dataSource]="(dataSource$ | async) || []">
        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>Title</th>
          <td mat-cell *matCellDef="let element">{{ element.title }}</td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
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
              <button mat-menu-item (click)="handleStatusChange(element)">
                {{ element.status === 'draft' ? 'Publish Job' : 'Archive Job' }}
              </button>
              <button mat-menu-item (click)="editJob(element)">Edit Job</button>
              <button mat-menu-item (click)="deleteJob(element)">
                Delete Job
              </button>
            </mat-menu>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JobsStore],
})
export class JobsPageComponent implements OnInit {
  dataSource$ = this.store.data$;
  displayedColumns = ['title', 'description', 'skills', 'status', 'actions'];
  constructor(
    private jobsService: JobsService,
    private dialog: MatDialog,
    public store: JobsStore,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.store.fetch();
  }

  deleteJob(element: JobAdDto) {
    //TODO add confirmation dialog
    this.jobsService.deleteJob(element.id).subscribe((data) => {
      this.store.deleteJobAd(data);
      console.log(data);
    });
  }

  editJob(element: JobAdDto) {
    this.dialog
      .open(EditJobDialogComponent, {
        height: '100vh',
        width: '500px',
        position: {
          top: '0',
          right: '0',
        },
        data: element,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(data);
          this.store.updateJobAd(data);
        }
      });
  }

  createJob() {
    this.dialog
      .open(CreateJobDialogComponent, {
        height: '100vh',
        width: '500px',
        position: {
          top: '0',
          right: '0',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.store.addJobAd(data);
        }
      });
  }

  handleStatusChange(element: JobAdDto) {
    console.log(element);
  }

  openFilter() {
    this.dialog
      .open(FilterJobsComponent, {
        height: '100vh',
        width: '500px',
        position: {
          top: '0',
          right: '0',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        console.log(data);
        this.router.navigate([], { queryParams: { ...data } });
      });
  }
}
