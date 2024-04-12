import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { JobsService } from '../data-access/jobs.service';
import { MatDialog } from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobsStore } from '../store/job.store';
import { FilterJobsComponent } from './filter/filter-jobs/filter-jobs.component';
import { Router } from '@angular/router';
import { combineLatest, filter, Subject, takeUntil, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobViewModel } from '../data-access/jobs';
import { IFilter } from '../../types/filter';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!vm.loading; else loading">
        <app-page-head
          pageName="Job ADs"
          [showCreate]="true"
          [showFiler]="true"
          (openCreate)="handleCreateJob()"
          (openFilter)="openFilter(vm.filters)"
        ></app-page-head>

        <div class="bg-white p-4">
          <div>
            <app-filter-bar
              [filters]="vm.filters"
              (removeFilter)="removeFilter(vm.filters, $event)"
            ></app-filter-bar>
          </div>
          <app-jobs-table
            [tableData]="vm.data"
            [columns]="displayedColumns"
            (statusChange)="handleStatusChange($event)"
            (editJob)="handleEditJob($event)"
            (deleteJob)="deleteJob($event)"
          ></app-jobs-table>
        </div>
      </ng-container>
    </ng-container>
    <ng-template #loading> Loading</ng-template>
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

  handleEditJob(element: JobViewModel) {
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

  handleCreateJob() {
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

  openFilter(filter: IFilter) {
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

  removeFilter(filters: IFilter, key: string) {
    const currentFilters = { ...filters };

    delete currentFilters[key];
    this.router.navigate([], { queryParams: currentFilters });
  }
}
