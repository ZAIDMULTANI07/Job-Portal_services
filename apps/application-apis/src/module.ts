import { Module } from '@nestjs/common';
import { ApplicationApisController } from './controller/application';
import { ApplicationApisService } from './service/application';
import { BoatModule } from '@libs/boat';
import { UserLibModule } from '@libs/users';
import { JobLibModule } from '@lib/jobs';
import { EventListener } from './listener/applyJobListener';
import {
  CandidateNotificationService,
  RecruiterNotificationService,
} from './jobs';
import { MailmanModule } from '@libs/boat/mailman/src';
import { ApplicationLibModule } from '@libs/applications';

@Module({
  imports: [ApplicationLibModule, UserLibModule, BoatModule, JobLibModule],
  controllers: [ApplicationApisController],
  providers: [
    ApplicationApisService,
    EventListener,
    RecruiterNotificationService,
    CandidateNotificationService,
    MailmanModule,
  ],
})
export class ApplicationApisModule {}
