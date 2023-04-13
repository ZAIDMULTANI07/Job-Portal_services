import { Injectable } from '@nestjs/common';
import { JobRepositoryContract } from './contract';
import { IJob, IJobSearch, IUser } from '@libs/common';
import { JobModel } from '../../models/job';
import { DatabaseRepository, InjectModel } from '@libs/boat/database/src';
import { Pagination } from '@libs/boat';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JobRepository
  extends DatabaseRepository<IJob>
  implements JobRepositoryContract
{
  @InjectModel(JobModel)
  model: JobModel;

  constructor(private config: ConfigService) {
    super();
  }

  async search(inputs: IJobSearch, user: IUser): Promise<Pagination<IJob>> {
    let query = this.query();
    if (user.role === this.config.get('settings.users.roles.Recruiter')) {
      query = query.where('jobs.userId', user.id);
    }

    if (inputs.eager) query.withGraphFetched(inputs.eager);

    if (inputs.q) {
      query.where('title', 'ilike', `%${inputs.q}%`);
    }

    query.orderBy('created_at', 'desc');
    const data = get(inputs, 'paginate', true)
      ? query.paginate(inputs.page ?? 1, inputs.perPage ?? 10)
      : query.allPages();
    return await data;
  }
}
