import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { InvoiceDto } from '../../types/invoices';
import { InvoicesService } from '../data-access/invoices.service';
import { JobsService } from '../../jobs/data-access/jobs.service';
import { Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InvoiceViewModel } from '../data-access/invoices';

@Injectable()
export class InvoicesStore extends ComponentStore<InvoiceViewModel[]> {
  data$ = this.select((state) => state);
  constructor(
    private invoiceService: InvoicesService,
    private jobsService: JobsService,
    private activatedRoute: ActivatedRoute,
  ) {
    super([]);
  }

  fetch = this.effect((params: Observable<any>) => {
    return params.pipe(
      switchMap((params) => {
        return this.invoiceService.getInvoices(params).pipe(
          tap((invoices) => {
            this.setState(invoices);
          }),
        );
      }),
    );
  });

  onFilterChange = this.effect(() => {
    return this.activatedRoute.queryParams.pipe(
      tap((params) => {
        this.fetch(params);
      }),
    );
  });
}
