import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { JobsService } from '../data-access/jobs.service';
import { EMPTY, iif, Observable, of, switchMap, tap } from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IDeleteResponse } from '../../types/delete-response';
import { JobViewModel } from '../data-access/jobs';
import { IFilter } from '../../types/filter';

interface IJobStore {
  jobs: JobViewModel[];
  filters: IFilter;
  loading: boolean;
  actionInProgress: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class JobsStore extends ComponentStore<IJobStore> {
  data$ = this.select((state) => state.jobs);
  loading$ = this.select((state) => state.loading);
  filters$ = this.select((state) => state.filters);
  actionInProgress$ = this.select((state) => state.actionInProgress);

  fetch = this.effect((filter$: Observable<IFilter>) =>
    filter$.pipe(
      switchMap((filter) => {
        return this.jobService.getJobs(filter).pipe(
          tap((data) => {
            this.setState((state) => ({
              ...state,
              jobs: data,
              loading: false,
            }));
          }),
        );
      }),
    ),
  );

  listenToFilters = this.effect(() => {
    return this.activatedRoute.queryParams.pipe(
      tap((value: Params) => {
        this.setState((state) => ({
          ...state,
          filters: value,
        }));
        this.fetch(value);
      }),
    );
  });

  createJobAd = this.effect((job$: Observable<Partial<JobViewModel>>) => {
    return job$.pipe(
      switchMap((job) => {
        this.toggleActionInProgress(true);
        return this.jobService.createJob(job as JobViewModel);
      }),
      tapResponse(
        (response: JobViewModel) => {
          this.updateJobs(response);
          this.createInvoice(response);
          this.toggleActionInProgress(false);
        },
        (error) => console.error(error),
      ),
    );
  });

  editJob = this.effect((job$: Observable<JobViewModel>) => {
    return job$.pipe(
      switchMap((job) => {
        this.toggleActionInProgress(true);
        return this.jobService.updateJob(job);
      }),
      tapResponse(
        (response: JobViewModel) => {
          this.updateJobs(response);
          this.createInvoice(response);
          this.toggleActionInProgress(false);
        },
        (error) => console.error(error),
      ),
    );
  });

  publishJob = this.effect((job$: Observable<JobViewModel>) => {
    return job$.pipe(
      switchMap((jobAd: JobViewModel) => {
        return this.jobService.updateJob({
          ...jobAd,
          status: 'published',
        });
      }),
      tap((job: JobViewModel) => {
        this.updateJobAd(job);
        this.createInvoice(job);
      }),
    );
  });

  archiveJob = this.effect((job$: Observable<JobViewModel>) => {
    return job$.pipe(
      switchMap((jobAd) => {
        return this.jobService
          .updateJob({
            ...jobAd,
            status: 'archived',
          })
          .pipe(
            tap((job) => {
              this.updateJobAd(job);
            }),
          );
      }),
    );
  });

  deleteJob = this.effect((job$: Observable<JobViewModel>) => {
    return job$.pipe(
      switchMap((job) => {
        return this.jobService.deleteJob(job.id);
      }),
      tapResponse(
        (res: IDeleteResponse) => this.removeJob(res.id),
        (error) => console.error(error),
      ),
      switchMap((res: IDeleteResponse) => {
        return this.invoiceService.deleteInvoiceByJobId(res.id);
      }),
    );
  });

  createInvoice = this.effect((job$: Observable<JobViewModel>) => {
    return job$.pipe(
      switchMap((one) => {
        return iif(
          () => one.status === 'published',
          this.createInvoiceForPublishedJob(one.id),
          of(EMPTY),
        );
      }),
    );
  });

  updateJobs = this.updater((state, job: JobViewModel) => ({
    ...state,
    jobs: [...state.jobs, job],
  }));

  updateJobAd = this.updater((state, job: JobViewModel) => ({
    ...state,
    jobs: state.jobs.map((newJob: JobViewModel) =>
      newJob.id === job.id ? job : newJob,
    ),
  }));

  removeJob = this.updater((state, id: string) => ({
    ...state,
    jobs: state.jobs.filter((job) => job.id !== id),
  }));

  toggleActionInProgress = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      actionInProgress: isLoading,
    };
  });

  constructor(
    private jobService: JobsService,
    private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super({
      jobs: [],
      filters: {},
      loading: true,
      actionInProgress: false,
    });
  }

  private createInvoiceForPublishedJob(id: string) {
    return this.invoiceService.createInvoiceForJob(id);
  }
}
