import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roleConfig = this.configService.get('settings.allUsers.roles');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const rolesAllowed = roles.map((item) => roleConfig[item]);

    const {
      user: { role },
    } = context.switchToHttp().getRequest();

    return rolesAllowed.includes(role);
  }
}
