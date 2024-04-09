import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceDto } from '../../types/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<InvoiceDto[]> {
    return this.http.get<InvoiceDto[]>('http://localhost:3000/invoices');
  }

  createInvoice(payload: InvoiceDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(
      'http://localhost:3000/invoices',
      payload,
    );
  }
}
