import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { InvoiceDto } from '../../types/invoices';
import { InvoicesService } from '../data-access/invoices.service';
import { JobsService } from '../../jobs/data-access/jobs.service';
import { map, mergeMap, switchMap } from 'rxjs';

@Injectable()
export class InvoicesStore extends ComponentStore<InvoiceDto[]> {
  data$ = this.select((state) => state);
  constructor(
    private invoiceService: InvoicesService,
    private jobsService: JobsService,
  ) {
    super([]);
  }

  fetch = this.effect(() => {
    return this.invoiceService.getInvoices().pipe(
      mergeMap((invoices) => {
        console.log();
        return this.jobsService
          .getJobs({
            // id: {
            //   in: invoices
            //     .map((i) => i.jobAdId)
            //     .filter((e) => !!e)
            //     .toString(),
            // },
          })
          .pipe(
            map((data) => {
              console.log(data);
              console.log(invoices);
              return data;
            }),
          );
      }),
    );
  });
}
