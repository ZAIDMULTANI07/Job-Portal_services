import {
  LoadRelSchema,
  ObjectionModel,
  SortableSchema,
} from '@libs/boat/interfaces';
import { IJobs } from '@libs/boat/interfaces/jobs';
import { IUser } from '@libs/boat/interfaces/user';

export interface IApp extends ObjectionModel {
  id?: number;
  userId?: number;
  jobId?: number;
  jobs?: IJobs;
  users?: IUser;
  createdAt?: string;
}

export interface IAppSearch extends SortableSchema {
  id?: number;
  jobId?: number;
  userId?: number;
  page?: number;
  perPage?: number;
  eager?: LoadRelSchema;
  paginate?: boolean;
  pagination?: string;
}
