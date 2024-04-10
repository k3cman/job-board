import { Injectable } from '@angular/core';
import { BaseRepository } from '../../core/repositories/base.repository';
import { JobAdDto } from '../../types/jobs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JobsRepoService extends BaseRepository<JobAdDto> {
  constructor(http: HttpClient) {
    super(http);
    this.endpoint = environment.apiUrl + 'jobs';
  }
}
