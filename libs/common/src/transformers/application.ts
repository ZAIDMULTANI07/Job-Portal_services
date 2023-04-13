import { Transformer } from '@libs/boat';
import { IApplications } from '../interfaces';
import { JobTransformer } from './job';
import { UserTransformer } from './user';
import { IUser } from '@libs/boat/interfaces/user';

export class ApplicationsTransformer extends Transformer {
  public availableIncludes: ['user'];
  public defaultIncludes = ['job'];
  async transform(input: IApplications): Promise<Record<string, any>> {
    return {
      id: input.ulid,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
  async includeJob(input: IApplications): Promise<Record<string, any>> {
    return this.item(input.job, new JobTransformer());
  }
  async includeUser(input: IUser): Promise<Record<string, any>> {
    await input.$load({ user: true });
    return this.item(input.user, new UserTransformer());
  }
}
