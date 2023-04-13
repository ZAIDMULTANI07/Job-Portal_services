import { IUser } from '@libs/common';
import { RepositoryContract } from '@libs/boat/database/src';
import { Pagination } from '@libs/boat';

export interface UserRepositoryContract extends RepositoryContract<IUser> {
  search(inputs: Record<string, any>, user: IUser): Promise<Pagination<IUser>>;
}
