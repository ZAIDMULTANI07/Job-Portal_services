import { Global, Module } from '@nestjs/common';
import config from '@config/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, DiscoveryModule } from '@nestjs/core';
import { BaseValidator } from './validator';
import { ObjectionModule } from '@libs/boat/database/src';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { EventExplorer } from './events';
import { EventQueueWorker } from './events/queue';
import { ConsoleExplorer, ListCommands } from './console';
import { CacheCommands, CacheMetadata, CacheService } from './cache';
import { MailmanModule } from '@libs/boat/mailman/src';
import { AppConfig } from './utils';
import { IsValueFromConfigConstraint } from './validator/isValueFromConfig';
import pg from 'pg';
import {
  QueueConsoleCommands,
  QueueExplorer,
  QueueMetadata,
  QueueService,
} from './queue';
import { NestCacheModule } from './nest-cache/src/nest-cache.module';
pg.types.setTypeParser(20, (val) => parseInt(val));
@Global()
@Module({
  imports: [
    DiscoveryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: config,
    }),
    NestCacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('cache'),
      inject: [ConfigService],
    }),
    MailmanModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('mailman'),
      inject: [ConfigService],
    }),
    ObjectionModule.registerAsync({
      isGlobal: true,
      imports: [],
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [
    AppConfig,
    BaseValidator,
    QueueExplorer,
    QueueService,
    QueueMetadata,
    QueueConsoleCommands,
    EventExplorer,
    EventQueueWorker,
    ConsoleExplorer,
    CacheService,
    CacheMetadata,
    CacheCommands,
    ListCommands,
    IsValueFromConfigConstraint,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [BaseValidator],
})
export class BoatModule {}
