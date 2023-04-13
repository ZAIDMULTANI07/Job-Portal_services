import { ObjectionModel } from '@libs/boat/database/src';
import { LoadRelSchema } from '@squareboat/nestjs-objection';

export interface IUser extends ObjectionModel {
  id?: number;
  ulid?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: number;
  createdAt?: Date;
  updatedAt?: Date;
  token?: string;
}

export interface IUserJwtPayload {
  issuedat?: Date;
  sub: number;
  username: string;
  password: string;
}
export interface IUserSearch {
  page?: number;
  perPage?: number;
  q: string;
}
