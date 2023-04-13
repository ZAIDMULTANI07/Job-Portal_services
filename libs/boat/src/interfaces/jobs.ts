import {
  ObjectionModel,
  SortableSchema,
  LoadRelSchema,
} from '@libs/boat/interfaces';
import { IApp } from '@libs/boat/interfaces/applications';
import { IUser } from '@libs/boat/interfaces/user';
export interface IJobs extends ObjectionModel {
  id?: number;
  userId?: number;
  title?: string;
  description?: string;
  location?: string;
  applications?: IApp[];
  user?: IUser;
}

export interface IJobsSearch extends SortableSchema {
  jobId?: number;
  userId?: number;
  title?: string;
  description?: string;
  location?: string;
  page?: number;
  sort?: string;
  perPage?: number;
  eager?: LoadRelSchema;
  paginate?: boolean;
  pagination?: string;
}
