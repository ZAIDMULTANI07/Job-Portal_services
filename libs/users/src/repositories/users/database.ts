import { Injectable } from '@nestjs/common';
import { IUser, IUserSearch } from '@libs/common';
import { DatabaseRepository, InjectModel } from '@libs/boat/database/src';
import { UserModel } from '../../models/user';
import { UserRepositoryContract } from './contract';
import { ConfigService } from '@nestjs/config';
import { get } from 'lodash';
import { Pagination } from '@libs/boat';

@Injectable()
export class UserRepository
  extends DatabaseRepository<IUser>
  implements UserRepositoryContract
{
  @InjectModel(UserModel)
  model: UserModel;

  constructor(private config: ConfigService) {
    super();
  }
  async search(inputs: IUserSearch, user: IUser): Promise<Pagination<IUser>> {
    let query = this.query();

    if (inputs.q) {
      query.where('name', 'ilike', `%${inputs.q}%`);
    }

    query.orderBy('created_at', 'desc');
    const data = get(inputs, 'paginate', true)
      ? query.paginate(inputs.page ?? 1, inputs.perPage ?? 10)
      : query.allPages();
    return await data;
  }
}
