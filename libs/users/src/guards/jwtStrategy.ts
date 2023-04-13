import { IUser, IUserJwtPayload } from '@libs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserLibService } from '../services/user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userLibService: UserLibService,
    private configService: ConfigService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IUserJwtPayload): Promise<IUser> {
    const { sub } = payload;
    const user: IUser = await this.userLibService.repo.firstWhere(
      { id: +sub },
      false,
    );

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
