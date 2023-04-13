import { ApplicationModel } from '@libs/applications';
import { BaseModel } from '@libs/boat/database/src';
import { UserModel } from '@libs/users';

export class JobModel extends BaseModel {
  static tableName: string = 'jobs';
  static relationMappings = {
    recruiter: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'jobs.userId',
        to: 'users.id',
      },
    },
    applications: {
      relation: BaseModel.HasManyRelation,
      modelClass: ApplicationModel,
      join: {
        from: 'jobs.id',
        to: 'applications.jobId',
      },
    },
  };
}
