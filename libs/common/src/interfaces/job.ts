import { ObjectionModel } from '@libs/boat/database/src';
import { LoadRelSchema } from '@squareboat/nestjs-objection';
import { text } from 'aws-sdk/clients/customerprofiles';
import { IUser } from './user';

export interface IJob extends ObjectionModel {
  id?: number;
  ulid?: string;
  title?: string;
  userId?: number;
  recruiter?: IUser;
  applications?: IJob[];
  description?: text;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJobSearch extends ObjectionModel {
  page?: number;
  perPage?: number;
  q: string;
  eager?: LoadRelSchema;
}
