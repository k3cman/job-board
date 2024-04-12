export interface JobAd {
  id: string | number;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';

export interface JobAdDto extends JobAd {
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
