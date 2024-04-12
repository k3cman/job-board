import { Injectable } from '@angular/core';
import { BaseRepository } from './base.repository';
import { JobAdDto } from '@appTypes/jobs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JobRepository extends BaseRepository<JobAdDto> {
  constructor(http: HttpClient) {
    super(http, 'jobs');
  }
}
