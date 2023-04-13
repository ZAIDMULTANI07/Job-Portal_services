import { Pagination } from '@libs/boat';
import { RepositoryContract } from '@libs/boat/database/src';
import { IJob, IUser } from '@libs/common';

export interface JobRepositoryContract extends RepositoryContract<IJob> {
  search(inputs: Record<string, any>, user: IUser): Promise<Pagination<IJob>>;
}
