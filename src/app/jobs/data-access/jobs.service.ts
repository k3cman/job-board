import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JobAdDto } from '../../types/jobs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobs(filter: any): Observable<JobAdDto[]> {
    const params = new HttpParams().appendAll(filter);
    return this.http.get<JobAdDto[]>('http://localhost:3000/jobs', { params });
  }

  createJob(payload: JobAdDto): Observable<JobAdDto> {
    console.log('123');
    return this.http.post<JobAdDto>('http://localhost:3000/jobs', payload);
  }

  updateJob(payload: JobAdDto): Observable<JobAdDto> {
    return this.http.put<JobAdDto>(
      'http://localhost:3000/jobs/' + payload.id,
      payload,
    );
  }

  deleteJob(id: number): Observable<{ id: string; isTrusted: boolean }> {
    return this.http.delete<{ id: string; isTrusted: boolean }>(
      'http://localhost:3000/jobs/' + id.toString(),
    );
  }
}
