import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { JobsService } from '../data-access/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobsStore } from '../store/job.store';
import { JobAdDto } from '../../types/jobs';
import { FilterJobsComponent } from './filter/filter-jobs/filter-jobs.component';
import { Router } from '@angular/router';
import { combineLatest, filter, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobViewModel } from '../data-access/jobs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!vm.loading; else loading">
        <div class="flex items-center justify-between p-2">
          <div class="text-lg">Job Ads</div>
          <div>
            <button
              mat-stroked-button
              (click)="openFilter(vm.filters)"
              class="mr-4"
            >
              <mat-icon>filter_alt</mat-icon>
              Filter
            </button>
            <button mat-stroked-button color="primary" (click)="createJob()">
              <mat-icon>add</mat-icon>
              Create Job Ad
            </button>
          </div>
        </div>

        <div class="bg-white p-4">
          <div>
            <ng-container *ngFor="let filter of vm.filters | keyvalue">
              <mat-chip-row>
                <mat-chip>
                  <div class="flex items-center">
                    <span>{{ filter.key }}: {{ filter.value }}</span>
                    <mat-icon (click)="removeFilter(vm.filters, filter.key)"
                      >cancel</mat-icon
                    >
                  </div>
                </mat-chip>
              </mat-chip-row>
            </ng-container>
          </div>
          <table mat-table [dataSource]="vm.data">
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
                  <button mat-menu-item (click)="handleStatusChange(element)">
                    {{
                      element.status === 'draft' ? 'Publish Job' : 'Archive Job'
                    }}
                  </button>
                  <button mat-menu-item (click)="editJob(element)">
                    Edit Job
                  </button>
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
      </ng-container>
    </ng-container>
    <ng-template #loading> Loading </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [JobsStore],
})
export class JobsPageComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();
  displayedColumns = ['title', 'description', 'skills', 'status', 'actions'];

  vm$ = combineLatest({
    loading: this.store.loading$,
    data: this.store.data$,
    filters: this.store.filters$,
  });
  constructor(
    private jobsService: JobsService,
    private dialog: MatDialog,
    public store: JobsStore,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  deleteJob(element: JobViewModel) {
    this.jobsService.deleteJob(element.id).subscribe((data) => {
      this.store.deleteJobAd(data);
    });
  }

  editJob(element: JobViewModel) {
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
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => !!data),
      )
      .subscribe((data: JobViewModel) => {
        this.store.updateJob(data);
        this.snackBar.open(data.title + 'Job updated successfully');
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
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => !!data),
      )
      .subscribe((data) => {
        console.log(data);
        this.store.addJobAd(data);
        this.snackBar.open(data.title + 'Job Ad created successfully');
      });
  }

  handleStatusChange(element: JobViewModel) {
    if (element.status === 'draft') {
      this.store.publishJob(element);
    } else {
      this.store.archiveJob(element);
    }
  }

  openFilter(filter: any) {
    this.dialog
      .open(FilterJobsComponent, {
        height: '100vh',
        width: '500px',
        position: {
          top: '0',
          right: '0',
        },
        data: filter,
      })
      .afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        this.router.navigate([], { queryParams: { ...data } });
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  removeFilter(filters: any, key: unknown) {
    const currentFilters = { ...filters };

    delete currentFilters[key as string];
    this.router.navigate([], { queryParams: currentFilters });
  }
}
