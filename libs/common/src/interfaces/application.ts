import { LoadRelSchema, ObjectionModel } from '@libs/boat';
import { IJob } from './job';

export interface IApplications extends ObjectionModel {
  id?: number;
  ulid?: string;
  userId?: number;
  jobId?: number;
  job?: IJob[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IApplicationsSearch extends ObjectionModel {
  page?: number;
  perPage?: number;
  q: string;
  eager?: LoadRelSchema;
}
