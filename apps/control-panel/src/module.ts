import app from '@config/app';
import database from '@config/database';
import services from '@config/services';
import settings from '@config/settings';
import { BoatModule } from '@libs/boat';
import { UserLibModule } from '@libs/users';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConsoleModule } from '@squareboat/nest-console';
import { CreateAdmin } from './commands/createAdmin';

@Module({
  imports: [
    BoatModule,
    ConsoleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database, app, services, settings],
    }),
    UserLibModule,
  ],
  providers: [CreateAdmin],
})
export class ControlPanelModule {}
