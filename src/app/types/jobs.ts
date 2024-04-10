export interface JobAd {
  id: number;
  title: string;
  description: string;
  skills: string[];
  status: JobAdStatus;
}

export type JobAdStatus = 'draft' | 'published' | 'archived';

export interface JobAdDto extends JobAd {
  // DTO properties that are not part of the model
  createdAt: Date;
  updatedAt: Date;
  _embedded: unknown;
}
