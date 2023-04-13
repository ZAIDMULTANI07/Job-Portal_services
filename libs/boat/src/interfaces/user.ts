import {
  LoadRelSchema,
  ObjectionModel,
  SortableSchema,
} from '@libs/boat/interfaces';
import { IJobs } from './jobs';
import { IApp } from './applications';
export interface IUser extends ObjectionModel {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  status?: number;
  password?: string;
  skills?: string;
  role?: number;
  applications?: IApp[];
  user?: IUser;
  jobs?: IJobs[];
  sub?: number;
  token?: string;
  token_old?: string;
  old_user?: IUser;
}

export interface IUserSearch extends SortableSchema {
  q?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: number;
  type?: number;
  status?: number;
  skills?: string;
  page?: number;
  perPage?: number;
  eager?: LoadRelSchema;
  paginate?: boolean;
  pagination?: string;
  sort?: string;
}
