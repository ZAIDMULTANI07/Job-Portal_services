import { UserRepository } from './repositories/users/database';
import { Module } from '@nestjs/common';
import { UserLibService } from './services/user';
import { JwtAuthGuard } from './guards/jwtAuthGuard';
import { JwtStrategy } from './guards/jwtStrategy';
import { BoatModule } from '@libs/boat';

@Module({
  imports: [BoatModule],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    UserLibService,
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
  ],
  exports: [UserLibService, JwtStrategy, JwtAuthGuard],
})
export class UserLibModule {}
