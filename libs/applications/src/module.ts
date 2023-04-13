import { Module } from '@nestjs/common';
import { ApplicationLibService } from './services/application';
import { ApplicationLibConstants } from './constants';
import { ApplicationRepository } from './repositories/database';

@Module({
  providers: [
    ApplicationLibService,
    {
      provide: ApplicationLibConstants.APPLICATION_REPOSITORY,
      useClass: ApplicationRepository,
    },
  ],
  exports: [ApplicationLibService],
})
export class ApplicationLibModule {}
