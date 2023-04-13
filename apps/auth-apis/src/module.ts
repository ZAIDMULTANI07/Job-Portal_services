import { UserLibModule } from '@libs/users';
import { Module } from '@nestjs/common';
import { AuthApisController } from './controller/auth';
import { AuthApisService } from './service/auth';
import { BoatModule } from '@libs/boat';
import { BaseValidator } from '@libs/boat/validator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@libs/users/guards/jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import {
  ForgetPasswordNotification,
  ResetPasswordNotification,
} from './jobs/mailMessgae';
import { EventListener } from './listener';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('jwt'),
      inject: [ConfigService],
    }),
    UserLibModule,
    BoatModule,
  ],
  controllers: [AuthApisController],
  providers: [
    AuthApisService,
    BaseValidator,
    ConfigService,
    JwtStrategy,
    ForgetPasswordNotification,
    EventListener,
    ResetPasswordNotification,
  ],
  exports: [AuthApisService],
})
export class AuthApisModule {}
