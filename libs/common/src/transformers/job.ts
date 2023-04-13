import { Job, Transformer, Transformer$IncludeMethodOptions } from '@libs/boat';
import { IJob } from '../interfaces';
import { UserTransformer } from './user';
import { ApplicationsTransformer } from './application';
export class JobTransformer extends Transformer {
  public defaultIncludes: ['recruiter', 'applications'];
  public availableIncludes: ['recruiter', 'applications'];
  async transform(input: IJob): Promise<Record<string, any>> {
    return {
      id: input.ulid,
      title: input.title,
      description: input.description,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    };
  }
  async includeRecruiter(input: IJob): Promise<Record<string, any>> {
    return this.item(input.recruiter, new UserTransformer());
  }

  async includeApplications(
    input: IJob,
    options: Transformer$IncludeMethodOptions,
  ): Promise<Record<string, any>> {
    return this.collection(
      input.applications,
      new ApplicationsTransformer(),
      options,
    );
  }
}
