import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobsService } from '../data-access/jobs.service';
import {
  BehaviorSubject,
  EMPTY,
  iif,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { InvoiceDto } from '../../types/invoices';
import { ActivatedRoute } from '@angular/router';
import { IDeleteResponse } from '../../types/delete-response';
import { JobViewModel } from '../data-access/jobs';
import { IFilter } from '../../types/filter';
import { JobsModule } from '../feature/jobs.module';

interface IJobStore {
  jobs: JobViewModel[];
  filters: IFilter;
  loading: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class JobsStore extends ComponentStore<IJobStore> {
  data$ = this.select((state) => state.jobs);
  loading$ = this.select((state) => state.loading);
  filters$ = this.select((state) => state.filters);

  fetch = this.effect((filter: Observable<IFilter>) =>
    filter.pipe(
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

  addJobAd = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
      tap((job) => {
        this.updateJobs(job);
        this.createInvoice(job);
      }),
    );
  });

  listenToFilters = this.effect(() => {
    return this.activatedRoute.queryParams.pipe(
      tap((value) => {
        this.setState((state) => ({
          ...state,
          filters: value,
        }));
        this.fetch(value);
      }),
    );
  });

  deleteJobAd = this.effect((response: Observable<IDeleteResponse>) => {
    return response.pipe(
      switchMap(({ id }) => {
        this.removeJob(id);
        return this.invoiceService.getInvoiceByJobId(id);
      }),
      switchMap((invoice: InvoiceDto | null) => {
        if (invoice) {
          return this.invoiceService.deleteInvoice(invoice.id);
        }
        return EMPTY;
      }),
    );
  });

  updateJob = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
      tap((job) => {
        this.createInvoice(job);
      }),
    );
  });

  publishJob = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
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

  archiveJob = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
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

  createInvoice = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
      switchMap((one) => {
        return iif(
          () => one.status === 'published',
          this.createInvoiceForPublishedJob(one.id),
          of(EMPTY),
        );
      }),
    );
  });

  updateJobAd = this.updater((state, job: JobViewModel) => ({
    ...state,
    jobs: state.jobs.map((e) => (e.id === job.id ? job : e)),
  }));

  updateJobs = this.updater((state, job: JobViewModel) => ({
    ...state,
    jobs: [...state.jobs, job],
  }));

  removeJob = this.updater((state, id: string) => ({
    ...state,
    jobs: state.jobs.filter((job) => job.id !== id),
  }));

  constructor(
    private jobService: JobsService,
    private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super({
      jobs: [],
      filters: {},
      loading: true,
    });
  }

  private createInvoiceForPublishedJob(id: string) {
    return this.invoiceService.createInvoiceForJob(id);
  }
}
