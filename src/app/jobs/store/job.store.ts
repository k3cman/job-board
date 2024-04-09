import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../types/jobs';
import { JobsService } from '../data-access/jobs.service';
import { EMPTY, Observable, switchMap, tap } from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { InvoiceDto } from '../../types/invoices';

@Injectable()
export class JobsStore extends ComponentStore<JobAdDto[]> {
  data$ = this.select((state) => state);

  fetch = this.effect(() =>
    this.jobService.getJobs().pipe(
      tap((data) => {
        this.setState(data);
      }),
    ),
  );

  addJobAd = this.effect((job: Observable<JobAdDto>) => {
    return job.pipe(
      switchMap((job: JobAdDto) => {
        this.updateJobs(job);
        return this.invoiceService.createInvoice({
          jobAdId: job.id,
          amount: 333,
          createdAt: new Date(),
          updatedAt: new Date(),
          dueDate: new Date(),
        });
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

  updateJobs = this.updater((state, job: JobAdDto) => [...state, job]);
  removeJob = this.updater((state, id: string) => {
    return state.filter((e) => e.id.toString() !== id);
  });
  constructor(
    private jobService: JobsService,
    private invoiceService: InvoicesService,
  ) {
    super([]);
  }
}
