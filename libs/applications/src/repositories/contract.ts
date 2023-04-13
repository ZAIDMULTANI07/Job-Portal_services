import { IApplications, IUser } from '@libs/common';
import { RepositoryContract } from '@libs/boat/database/src';
import { Pagination } from '@squareboat/nestjs-objection';

export interface ApplicationRepositoryContract
  extends RepositoryContract<IApplications> {
  search(
    inputs: Record<string, any>,
    user: IUser,
  ): Promise<Pagination<IApplications>>;
}
