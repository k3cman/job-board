import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../types/jobs';
import { JobsService } from '../data-access/jobs.service';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { InvoiceDto } from '../../types/invoices';
import { ActivatedRoute } from '@angular/router';
import { IDeleteResponse } from '../../types/delete-response';
import { JobViewModel } from '../data-access/jobs';

interface IJobStore {
  jobs: JobViewModel[];
  filters: any;
  loading: boolean;
}
@Injectable()
export class JobsStore extends ComponentStore<IJobStore> {
  data$ = this.select((state) => state.jobs);
  loading$ = this.select((state) => state.loading);
  filters$ = this.select((state) => state.filters);

  fetch = this.effect((filter: Observable<any>) =>
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
      switchMap((job: JobViewModel) => {
        this.updateJobs(job);
        console.log(job);
        if (job.status === 'published') {
          return this.createInvoiceForPublishedJob(job.id);
        } else {
          return EMPTY;
        }
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
          return this.invoiceService.deleteInvoice(invoice.id.toString());
        }
        return EMPTY;
      }),
    );
  });

  updateJob = this.effect((job: Observable<JobViewModel>) => {
    return job.pipe(
      switchMap((job) => {
        if (job.status === 'published') {
          return this.createInvoiceForPublishedJob(job.id);
        } else {
          return EMPTY;
        }
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
      switchMap((job: JobViewModel) => {
        this.updateJobAd(job);
        return this.createInvoiceForPublishedJob(job.id);
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
    jobs: state.jobs.filter((job) => job.id.toString() !== id),
  }));

  constructor(
    private jobService: JobsService,
    private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
  ) {
    super({
      jobs: [],
      filters: undefined,
      loading: true,
    });
  }

  private createInvoiceForPublishedJob(id: string | number) {
    return this.invoiceService.createInvoiceForJob(id.toString());
  }
}
