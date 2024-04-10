import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../types/jobs';
import { JobsService } from '../data-access/jobs.service';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { InvoiceDto } from '../../types/invoices';
import { ActivatedRoute } from '@angular/router';
import { KeyValue } from '@angular/common';

interface IJobStore {
  jobs: JobAdDto[];
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

  addJobAd = this.effect((job: Observable<JobAdDto>) => {
    return job.pipe(
      switchMap((job: JobAdDto) => {
        this.updateJobs(job);
        if (job.status === 'published') {
          return this.invoiceService.createInvoice({
            jobAdId: job.id,
            amount: 333,
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          });
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

  deleteJobAd = this.effect(
    (response: Observable<{ id: string; isTrusted: boolean }>) => {
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
    },
  );

  updateJob = this.effect((job: Observable<JobAdDto>) => {
    return job.pipe(
      switchMap((job) => {
        if (job.status === 'published') {
          return this.invoiceService.createInvoice({
            jobAdId: job.id,
            amount: 333,
            createdAt: new Date(),
            updatedAt: new Date(),
            dueDate: new Date(),
          });
        } else {
          return EMPTY;
        }
      }),
    );
  });

  publishJob = this.effect((job: Observable<JobAdDto>) => {
    return job.pipe(
      switchMap((jobAd) => {
        // this.createInvoiceForJob(jobAd)
        return this.jobService
          .updateJob({
            ...jobAd,
            status: 'published',
          })
          .pipe(
            tap((job) => {
              this.updateJobAd(job);
            }),
          );
      }),
    );
  });

  archiveJob = this.effect((job: Observable<JobAdDto>) => {
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

  updateJobAd = this.updater((state, job: JobAdDto) => ({
    ...state,
    jobs: state.jobs.map((e) => (e.id === job.id ? job : e)),
  }));

  updateJobs = this.updater((state, job: JobAdDto) => ({
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
}
