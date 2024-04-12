import { Injectable } from '@angular/core';
import { JobAdDto } from '../../types/jobs';
import { map, Observable } from 'rxjs';
import { JobRepository } from '../../core/repositories/job.repository';
import { IDeleteResponse } from '../../types/delete-response';
import { JobViewModel } from './jobs';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private repository: JobRepository) {}

  getJobs(filter: any): Observable<JobViewModel[]> {
    return this.repository.getAll(filter).pipe(
      map((data) =>
        data.map((job) => ({
          id: job.id,
          title: job.title,
          description: job.description,
          skills: job.skills,
          status: job.status,
          metadata: {
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
            _embedded: job._embedded,
          },
        })),
      ),
    );
  }

  createJob(payload: JobViewModel): Observable<JobViewModel> {
    const dto: JobAdDto = {
      id: payload.id,
      title: payload.title,
      description: payload.description,
      skills: payload.skills,
      status: payload.status,
      updatedAt: new Date(),
      createdAt: payload.metadata.createdAt,
      _embedded: payload.metadata._embedded,
    };
    return this.repository.create(dto).pipe(
      map((job) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        skills: job.skills,
        status: job.status,
        metadata: {
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          _embedded: job._embedded,
        },
      })),
    );
  }

  updateJob(payload: JobViewModel): Observable<JobViewModel> {
    const dto: JobAdDto = {
      id: payload.id,
      title: payload.title,
      description: payload.description,
      skills: payload.skills,
      status: payload.status,
      updatedAt: new Date(),
      createdAt: payload.metadata.createdAt,
      _embedded: payload.metadata._embedded,
    };
    return this.repository.put(payload.id, dto).pipe(
      map((job: JobAdDto) => ({
        id: job.id,
        title: job.title,
        description: job.description,
        skills: job.skills,
        status: job.status,
        metadata: {
          createdAt: job.createdAt,
          updatedAt: job.updatedAt,
          _embedded: job._embedded,
        },
      })),
    );
  }

  deleteJob(id: string): Observable<IDeleteResponse> {
    return this.repository.delete(id);
  }
}
