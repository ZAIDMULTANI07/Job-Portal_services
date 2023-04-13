import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApplicationApisService as ApplicationLibService } from '../service/application';
import {
  ApplicationsTransformer,
  Constants,
  Roles,
  RolesGuard,
} from '@libs/common';
import { Request, Response, RestController } from '@libs/boat';
import { JwtAuthGuard } from '@libs/users';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/applications')
export class ApplicationApisController extends RestController {
  constructor(private readonly applicationLibService: ApplicationLibService) {
    super();
  }

  @Get()
  @Roles(Constants.candidate)
  async getApplications(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const application = await this.applicationLibService.getAllApplications(
      req.all(),
      req.user,
    );
    const data = await this.paginate(
      application,
      new ApplicationsTransformer(),
      { req },
    );
    return res.withMeta(data);
  }

  @Post()
  @Roles(Constants.candidate)
  async applyJob(
    @Req() req: Request, 
    @Res() res: Response)
  : Promise<Response> {
    await this.applicationLibService.applyJob(req.all(), req.user);
    return res.noContent();
  }
}
