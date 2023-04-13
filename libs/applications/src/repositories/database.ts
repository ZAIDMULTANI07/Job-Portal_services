import { Injectable } from '@nestjs/common';
import { ApplicationRepositoryContract } from './contract';
import { IApplications, IApplicationsSearch, IUser } from '@libs/common';
import {
  DatabaseRepository,
  InjectModel,
  Pagination,
} from '@libs/boat/database/src';
import { ConfigService } from '@nestjs/config';
import { ApplicationModel } from '../models/applications';
import { get } from 'lodash';

@Injectable()
export class ApplicationRepository
  extends DatabaseRepository<IApplications>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;

  constructor(private config: ConfigService) {
    super();
  }

  async search(
    inputs: IApplicationsSearch,
    user: IUser,
  ): Promise<Pagination<IApplications>> {
    let query = this.query();
    query.where('applications.userId', user.id);
    if (inputs.eager) query.withGraphFetched(inputs.eager);

    query.orderBy('createdAt', 'DESC');

    const data = get(inputs, 'paginate', true)
      ? query.paginate(inputs.page ?? 1, inputs.perPage ?? 10)
      : query.allPages();
    return await data;
  }
}
