import { JobAdStatus } from '@appTypes/jobs';
import { JobViewModel } from './jobs';

export class JobsBuilder {
  private id = '';
  private title = '';
  private description = '';
  private skills: string[] = [];
  private status = 'draft';
  private metadata = {
    createdAt: new Date(),
    updatedAt: new Date(),
    _embedded: undefined,
  };

  static new(): JobsBuilder {
    return new JobsBuilder();
  }

  build(): JobViewModel {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      skills: this.skills,
      status: this.status as JobAdStatus,
      metadata: this.metadata,
    };
  }

  withId(value: string) {
    this.id = value;
    return this;
  }

  withTitle(value: string) {
    this.title = value;
    return this;
  }
  withDescription(value: string) {
    this.description = value;
    return this;
  }
  withSkills(value: string[]) {
    this.skills = value;
    return this;
  }
  withStatus(value: JobAdStatus) {
    this.status = value;
    return this;
  }
}
