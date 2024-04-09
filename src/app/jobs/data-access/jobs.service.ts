import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JobAdDto} from "../../types/jobs";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private http: HttpClient) {}

  getJobs():Observable<JobAdDto[]> {
    return this.http.get<JobAdDto[]>('http://localhost:3000/jobs');
  }

  createJob(payload: JobAdDto):Observable<JobAdDto>{
    return this.http.post<JobAdDto>('http://localhost:3000/jobs', payload)
  }

  updateJob(payload:JobAdDto):Observable<JobAdDto>{
    return this.http.put<JobAdDto>('http://localhost:3000/jobs/'+payload.id, payload)
  }

  deleteJob(id: string):Observable<void> {
    return this.http.delete<void>('http://localhost:3000/jobs/' + id);
  }
}
