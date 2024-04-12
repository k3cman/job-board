import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { InvoicesService } from '../data-access/invoices.service';
import { JobsService } from '../../jobs/data-access/jobs.service';
import { combineLatest, Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { InvoiceViewModel } from '../data-access/invoices';
import { IFilter } from '@appTypes/filter';

export interface IInvoiceStore {
  invoices: InvoiceViewModel[];
  filters: IFilter;
  loading: boolean;
}

@Injectable()
export class InvoicesStore extends ComponentStore<IInvoiceStore> {
  data$ = this.select((state) => state.invoices);
  loading$ = this.select((state) => state.loading);
  filters$ = this.select((state) => state.filters);

  vm$ = combineLatest({
    loading: this.loading$,
    data: this.data$,
    filters: this.filters$,
  });

  fetch = this.effect((params: Observable<IFilter>) => {
    return params.pipe(
      switchMap((params) => {
        return this.invoiceService.getInvoices(params).pipe(
          tap((invoices) => {
            this.setState((state) => ({
              ...state,
              invoices,
              loading: false,
            }));
          }),
        );
      }),
    );
  });

  onFilterChange = this.effect(() => {
    return this.activatedRoute.queryParams.pipe(
      tap((params: Params) => {
        this.fetch(params);
      }),
    );
  });

  constructor(
    private invoiceService: InvoicesService,
    private jobsService: JobsService,
    private activatedRoute: ActivatedRoute,
  ) {
    super({
      invoices: [],
      filters: {},
      loading: true,
    });
  }
}
