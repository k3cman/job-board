import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { JobsService } from '../data-access/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobsStore } from '../store/job.store';
import { JobAdDto } from '../../types/jobs';

@Component({
  template: `
    <div>
      <div class="flex items-center justify-end p-2">
        <button mat-mini-fab (click)="createJob()">
          <mat-icon> add_circle </mat-icon>
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
            {{ element.skills | json }}
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">{{ element.status }}</td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef></th>
          <td mat-cell *matCellDef="let element">
            <button
              mat-icon-button
              aria-label="Example icon button with a vertical three dot icon"
              (click)="editJob(element)"
            >
              <mat-icon>edit</mat-icon>
            </button>
            <button
              mat-icon-button
              aria-label="Example icon button with a vertical three dot icon"
              (click)="deleteJob(element)"
            >
              <mat-icon>delete</mat-icon>
            </button>
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
  ) {}

  ngOnInit() {
    this.store.fetch();
  }

  deleteJob(element: JobAdDto) {
    //TODO add confirmation dialog
    this.jobsService.deleteJob(element.id).subscribe((data) => {
      this.store.deleteJobAd(data);
      console.log(data);
    });
  }

  editJob(element: JobAdDto) {
    this.dialog.open(EditJobDialogComponent, {
      height: '100vh',
      width: '500px',
      position: {
        top: '0',
        right: '0',
      },
      data: element,
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
        this.store.addJobAd(data);
      });
  }
}
