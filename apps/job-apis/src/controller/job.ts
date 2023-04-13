import { RestController, Request, Response } from '@libs/boat';
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JobApisService } from '../service/job';
import { JwtAuthGuard } from '@libs/users/guards/jwtAuthGuard';
import { JobTransformer, RolesGuard } from '@libs/common';
import { Roles } from '@libs/common/decorators';
import { Constants } from '@libs/common/Constants/role';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('jobs')
export class JobApisController extends RestController {
  constructor(private jobService: JobApisService) {
    super();
  }

  @Get()
  async getJobs(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const job = await this.jobService.getAllJob(req.all(), req.user);
    const data = await this.paginate(job, new JobTransformer(), { req });
    return res.withMeta(data);
  }

  @Get('/:id')
  async getJob(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const job = await this.jobService.getJobById(req.all(), req.user);
    return res.success(
      await this.transform(job, new JobTransformer(), { req }),
      200,
    );
  }

  @Post()
  @Roles(Constants.recruiter)
  async createJob(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const job = await this.jobService.createJob(req.all(), req.user);
    return res.success(
      await this.transform(job, new JobTransformer(), { req }),
    );
  }

  @Delete('/:id')
  @Roles(Constants.admin)
  async deleteJob(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    await this.jobService.deleteJobById(req.all());
    return res.noContent();
  }

  @Patch('/:id')
  async updateJob(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const job = await this.jobService.updateJobById(req.all(), req.user);
    return res.success(
      await this.transform(job, new JobTransformer(), { req }),
      200,
    );
  }
}
