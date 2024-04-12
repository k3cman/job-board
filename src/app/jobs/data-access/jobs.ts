import { JobAdStatus } from '@appTypes/jobs';

export interface JobViewModel {
  id: string;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    _embedded: unknown;
  };
}
