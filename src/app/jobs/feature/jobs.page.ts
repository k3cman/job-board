import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditJobDialogComponent } from './edit-job/edit-job.dialog';
import { CreateJobDialogComponent } from './create-job/create-job.dialog';
import { JobsStore } from '../store/job.store';
import { FilterJobsComponent } from './filter/filter-jobs/filter-jobs.component';
import { Router } from '@angular/router';
import { combineLatest, filter, of, Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobViewModel } from '../data-access/jobs';
import { IFilter } from '../../types/filter';
import { ConfirmDialogComponent } from '../../shared/ui/confirm-dialog/confirm-dialog.component';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="!vm.loading; else loading">
        <app-page-head
          pageName="Job ADs"
          [showCreate]="true"
          [showFiler]="vm.data.length > 0"
          (openCreate)="handleCreateJob()"
          (openFilter)="openFilter(vm.filters)"
        ></app-page-head>
        <ng-container *ngIf="vm.data.length; else noData">
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
    </ng-container>
    <ng-template #noData>
      <div class="w-full h-full flex items-center justify-center flex flex-col">
        <img class="w-1/3 h-1/3" src="assets/no-data.svg" />
        <span class="text-2xl font-bold mt-10 text-slate-400"
          >You have no Job Ads. Please create one by clicking on Create
          button!</span
        >
      </div>
    </ng-template>
    <ng-template #loading>
      <div class="w-full h-full flex items-center justify-center">
        <mat-spinner></mat-spinner>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    private dialog: MatDialog,
    public store: JobsStore,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  deleteJob(element: JobViewModel) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: element,
      })
      .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
        filter((e) => !!e),
      )
      .subscribe(() => {
        this.store.deleteJob(element);
        this.snackBar.open(element.title + ' deleted successfully', undefined, {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
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
