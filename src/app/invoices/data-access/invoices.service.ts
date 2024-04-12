import { Injectable } from '@angular/core';
import {
  EMPTY,
  forkJoin,
  iif,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Invoice, InvoiceDto } from '../../types/invoices';
import { InvoiceRepository } from '../../core/repositories/invoice.repository';
import { InvoiceViewModel } from './invoices';
import { JobRepository } from '../../core/repositories/job.repository';
import { JobAdDto } from '../../types/jobs';
import { IDeleteResponse } from '../../types/delete-response';
import { IFilter } from '../../types/filter';
import { invoiceDueDate } from '../utils/invoice-due-date';
import { invoiceAmount } from '../utils/invoice-amount';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(
    private repository: InvoiceRepository,
    private jobRepository: JobRepository,
  ) {}

  getInvoices(filter: IFilter): Observable<InvoiceViewModel[]> {
    return this.repository.getAll(filter).pipe(
      mergeMap((invoices: InvoiceDto[]) => {
        return forkJoin(
          invoices.map((invoice) =>
            this.jobRepository.getById(invoice.jobAdId),
          ),
        ).pipe(
          map((jobs: JobAdDto[]) => {
            return invoices.map(
              (invoice) =>
                ({
                  id: invoice.id,
                  jobAdId: invoice.jobAdId,
                  jobName:
                    jobs.find((job) => job.id === invoice.jobAdId)?.title ||
                    'N/A',
                  amount: invoice.amount,
                  dueDate: invoice.dueDate,
                  metadata: {
                    createdAt: invoice.createdAt,
                    updatedAt: invoice.updatedAt,
                    _embedded: invoice._embedded,
                  },
                }) as InvoiceViewModel,
            );
          }),
        );
      }),
    );
  }
  createInvoice(payload: Partial<Invoice>): Observable<InvoiceDto> {
    const dto: Partial<InvoiceDto> = {
      ...payload,
      createdAt: new Date(),
      updatedAt: new Date(),
      _embedded: undefined,
    };
    return this.repository.create(dto as InvoiceDto);
  }

  deleteInvoice(id: string): Observable<IDeleteResponse> {
    return this.repository.delete(id);
  }

  createInvoiceForJob(jobId: string) {
    const invoice: Partial<Invoice> = {
      jobAdId: jobId,
      amount: invoiceAmount(),
      dueDate: invoiceDueDate(new Date()),
    };

    return this.createInvoice(invoice);
  }

  deleteInvoiceByJobId(jobId: string) {
    return this.repository.getAll({ jobId }).pipe(
      switchMap((invoices) => {
        return iif(
          () => invoices.length > 0,
          this.repository.delete(invoices[0].id),
          of(EMPTY),
        );
      }),
    );
  }
}
