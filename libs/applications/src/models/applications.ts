import { BaseModel } from '@libs/boat/database/src';
import { UserModel } from '@libs/users';
import path from 'path';
export class ApplicationModel extends BaseModel {
  static tableName: string = 'applications';

  static relationMappings = {
    job: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: path.join(__dirname, '../../../jobs/src/models/job'),
      join: {
        from: 'applications.jobId',
        to: 'jobs.id',
      },
    },
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: UserModel,
      join: {
        from: 'applications.userId',
        to: 'users.id',
      },
    },
  };
}
