import { JobLibModule } from '@lib/jobs';
import { Module } from '@nestjs/common';
import { JobApisController } from './controller/job';
import { JobApisService } from './service/job';
import { BoatModule } from '@libs/boat';
import { UserLibModule } from '@libs/users';
import { ConfigService } from 'aws-sdk';
import { ApplicationLibModule } from '@libs/applications';

@Module({
  imports: [BoatModule, UserLibModule, JobLibModule,ApplicationLibModule],
  controllers: [JobApisController],
  providers: [JobApisService, ConfigService],
  exports: [JobApisService],
})
export class JobApisModule {}
