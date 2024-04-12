import { InvoicesService } from '../../invoices/data-access/invoices.service';
import { InvoiceRepository } from './invoice.repository';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('InvoiceRepository', () => {
  let service: InvoiceRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoiceRepository, HttpClient],
    });

    service = TestBed.get(InvoiceRepository);

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be able to call get all', () => {
    const response = [
      {
        id: 'string',
        jobAdId: 'string',
        updatedAt: new Date(),
        dueDate: new Date(),
        createdAt: new Date(),
        amount: 321,
        _embedded: undefined,
      },
    ];
    service.getAll({}).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:3000/invoices');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpMock.verify();
  });

  it('should be able to call get by id', () => {
    const response = {
      id: 'string',
      jobAdId: 'string',
      updatedAt: new Date(),
      dueDate: new Date(),
      createdAt: new Date(),
      amount: 321,
      _embedded: undefined,
    };

    service.getById('string').subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:3000/invoices/string');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpMock.verify();
  });

  it('should be able to call create', () => {
    const payload = {
      id: '123',
      jobAdId: '321',
      updatedAt: new Date(),
      dueDate: new Date(),
      createdAt: new Date(),
      amount: 321,
      _embedded: undefined,
    };

    service.create(payload).subscribe((res) => {
      expect(res).toEqual(payload);
    });

    const req = httpMock.expectOne('http://localhost:3000/invoices');
    expect(req.request.method).toEqual('POST');
    req.flush(payload);

    httpMock.verify();
  });

  it('should be able to call put', () => {
    const payload = {
      id: '123',
      jobAdId: '321',
      updatedAt: new Date(),
      dueDate: new Date(),
      createdAt: new Date(),
      amount: 321,
      _embedded: undefined,
    };

    service.put('123', payload).subscribe((res) => {
      expect(res).toEqual(payload);
    });

    const req = httpMock.expectOne('http://localhost:3000/invoices/123');
    expect(req.request.method).toEqual('PUT');
    req.flush(payload);

    httpMock.verify();
  });

  it('should be able to call delete', () => {
    const payload = {
      id: '123',
      isTrusted: true,
    };

    service.delete('123').subscribe((res) => {
      expect(res).toEqual(payload);
    });

    const req = httpMock.expectOne('http://localhost:3000/invoices/123');
    expect(req.request.method).toEqual('DELETE');
    req.flush(payload);

    httpMock.verify();
  });
});
