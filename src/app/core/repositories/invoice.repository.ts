import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseRepository } from './base.repository';
import { InvoiceDto } from '../../types/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoiceRepository extends BaseRepository<InvoiceDto> {
  constructor(http: HttpClient) {
    super(http, 'invoices');
  }
}
