import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { JobRepository } from './job.repository';
import { JobAdDto } from '@appTypes/jobs';

describe('JobRepository', () => {
  let service: JobRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobRepository, HttpClient],
    });

    service = TestBed.get(JobRepository);

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be able to call get all', () => {
    const response: JobAdDto[] = [
      {
        id: '123',
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'draft',
        skills: ['testing'],
        title: 'Testing',
        description: 'No description',
        _embedded: undefined,
      },
    ];
    service.getAll({}).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:3000/jobs');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpMock.verify();
  });

  it('should be able to call get by id', () => {
    const response = {
      id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      skills: ['testing'],
      title: 'Testing',
      description: 'No description',
      _embedded: undefined,
    };

    service.getById('123').subscribe((res) => {
      expect(res).toEqual(response as JobAdDto);
    });

    const req = httpMock.expectOne('http://localhost:3000/jobs/123');
    expect(req.request.method).toEqual('GET');
    req.flush(response);

    httpMock.verify();
  });

  it('should be able to call create', () => {
    const payload = {
      id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      skills: ['testing'],
      title: 'Testing',
      description: 'No description',
      _embedded: undefined,
    };

    service.create(payload as JobAdDto).subscribe((res) => {
      expect(res).toEqual(payload as JobAdDto);
    });

    const req = httpMock.expectOne('http://localhost:3000/jobs');
    expect(req.request.method).toEqual('POST');
    req.flush(payload);

    httpMock.verify();
  });

  it('should be able to call put', () => {
    const payload = {
      id: '123',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'draft',
      skills: ['testing'],
      title: 'Testing',
      description: 'No description',
      _embedded: undefined,
    };

    service.put('123', payload as JobAdDto).subscribe((res) => {
      expect(res).toEqual(payload as JobAdDto);
    });

    const req = httpMock.expectOne('http://localhost:3000/jobs/123');
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

    const req = httpMock.expectOne('http://localhost:3000/jobs/123');
    expect(req.request.method).toEqual('DELETE');
    req.flush(payload);

    httpMock.verify();
  });
});
