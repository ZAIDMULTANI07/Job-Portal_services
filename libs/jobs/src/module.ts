import { Module } from '@nestjs/common';
import { JobLibConstants } from './constants';
import { JobRepository } from './repositories/jobs/database';
import { JobLibService } from './services/job';
import { BoatModule } from '@libs/boat';

@Module({
  providers: [
    JobLibService,
    {
      provide: JobLibConstants.JOB_REPOSITORY,
      useClass: JobRepository,
    },
  ],
  exports: [JobLibService],
})
export class JobLibModule {}
