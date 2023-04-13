import { RestController } from '@libs/boat';
import { Constants, Roles, RolesGuard, UserTransformer } from '@libs/common';
import { JwtAuthGuard } from '@libs/users';
import { Controller, Delete, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserApisServices } from '../service/user';
import { Response, Request } from '@libs/boat';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/admin/users')
export class UserApisController extends RestController {
  constructor(private userService: UserApisServices) {
    super();
  }

  @Get()
  @Roles(Constants.admin)
  async getAllUser(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response[]> {
    const user = await this.userService.getAllUsers(req.all(), req.user);
    const data = await this.paginate(user, new UserTransformer(), { req });
    return res.withMeta(data);
  }

  @Delete('/:id')
  @Roles(Constants.admin)
  async deleteUserById(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.deleteUserById(req.all());
    return res.noContent();
  }
}
