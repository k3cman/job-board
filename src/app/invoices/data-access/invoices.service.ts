import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Invoice, InvoiceDto } from '../../types/invoices';
import { JobAdDto } from '../../types/jobs';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('http://localhost:3000/invoices');
  }

  getInvoiceByJobId(id: string): Observable<InvoiceDto | null> {
    return this.http
      .get<InvoiceDto[]>('http://localhost:3000/invoices?jobAdId=' + id)
      .pipe(map((e) => (e.length ? e[0] : null)));
  }

  createInvoice(payload: Partial<InvoiceDto>): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(
      'http://localhost:3000/invoices',
      payload,
    );
  }

  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>('http://localhost:3000/invoices/' + id);
  }

  createInvoiceForJob(jobId: string) {
    // Todo create helper function
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 45);
    const invoice: Partial<InvoiceDto> = {
      jobAdId: +jobId,
      amount: Math.floor(Math.random() * 7) * 10,
      dueDate,
    };

    return this.createInvoice(invoice);
  }
}
