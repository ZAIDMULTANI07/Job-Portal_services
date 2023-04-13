import { Module } from '@nestjs/common';
import { UserLibModule } from '@libs/users';
import { BoatModule } from '@libs/boat';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BaseValidator } from '@libs/boat/validator';
import { UserApisController } from './controller/user';
import { UserApisServices } from './service/user';
import { JobLibModule } from '@lib/jobs';
import { ApplicationLibModule } from '@libs/applications';


@Module({
  imports: [UserLibModule, BoatModule, JobLibModule, ApplicationLibModule],
  controllers: [UserApisController],
  providers: [UserApisServices, BaseValidator, ConfigService],
  exports: [UserApisServices],
})
export class UserApisModule {}
