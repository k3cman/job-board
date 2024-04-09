import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { JobAdDto } from '../../types/jobs';
import { JobsService } from '../data-access/jobs.service';
import { Observable, switchMap, tap } from 'rxjs';
import { InvoicesService } from '../../invoices/data-access/invoices.service';

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
          id: 1,
          _embedded: undefined,
        });
      }),
    );
  });

  updateJobs = this.updater((state, job: JobAdDto) => [...state, job]);
  constructor(
    private jobService: JobsService,
    private invoiceService: InvoicesService,
  ) {
    super([]);
  }
}
