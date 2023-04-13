import { JobLibService } from '@lib/jobs';
import { BaseValidator } from '@libs/boat/validator';
import { CreateJobDTO, IJob, IUser } from '@libs/common';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateJobDTO } from '@libs/common/validators/jobDTO';
import { ulid } from 'ulid';
import { Pagination } from '@squareboat/nestjs-objection';
import { JobByIdDTO as JobByIdDTO } from '@libs/common/validators/jobDTO';
import { ConfigService } from '@nestjs/config';
import { PaginationDTO } from '@libs/common/validators/userDTO';
import { ApplicationLibService } from '@libs/applications';

@Injectable()
export class JobApisService {
  constructor(
    private readonly jobLibService: JobLibService,
    private readonly validator: BaseValidator,
    private config: ConfigService,
    private applicationLibService: ApplicationLibService
  ) {}

  async getJobById(input: JobByIdDTO, user: IUser): Promise<IJob> {
    let validatedInputs = await this.validator.fire(input, JobByIdDTO);
    const job = await this.jobLibService.repo.firstWhere({
      ulid: validatedInputs.id,
    });

    if (
      user.role === this.config.get('settings.users.roles.Recruiter') &&
      job.userId !== user.id
    ) {
      throw new UnauthorizedException();
    }

    return job;
  }

  async getAllJob(
    inputs: PaginationDTO,
    user: IUser,
  ): Promise<Pagination<IJob>> {
    let validatedInputs = await this.validator.fire(inputs, PaginationDTO);
    const { page, perPage } = inputs;
    inputs.page = page;
    inputs.perPage = perPage;
    const eager = { recruiter: true };
    if (user.role === this.config.get('settings.users.roles.Recruiter')) {
      eager['applications'] = true;
    }
    return await this.jobLibService.repo.search(
      { ...validatedInputs, eager },
      user,
    );
  }

  async createJob(input: CreateJobDTO, user: IUser): Promise<IJob> {
    let validatedInputs = await this.validator.fire(input, CreateJobDTO);
    validatedInputs['userId'] = user.id;
    return await this.jobLibService.repo.create({
      title: validatedInputs.title,
      userId: user.id,
      description: validatedInputs.description,
      ulid: ulid(),
    });
  }
  async deleteJobById(inputs: JobByIdDTO): Promise<boolean> {
    let validatedInputs = await this.validator.fire(inputs, JobByIdDTO);
     const job = await this.jobLibService.repo.firstWhere({
      ulid: validatedInputs.id,
    });
    await this.applicationLibService.repo.deleteWhere({
      jobId: job.id,
    });
    return await this.jobLibService.repo.deleteWhere({
      ulid: validatedInputs.id,
    });
  }
  async updateJobById(inputs: UpdateJobDTO, user: IUser): Promise<IJob> {
    const { id, ...input } = inputs;
    inputs.id = id;
    const validatedInputs = await this.validator.fire(
      { ...input, id },
      UpdateJobDTO,
    );
    const jobDetails = await this.jobLibService.repo.firstWhere({
      ulid: validatedInputs.id,
    });
    if (jobDetails['userId'] != user.id) {
      throw new UnauthorizedException(
        'Access not allowed to update this job',
        '403',
      );
    }
    return (await this.jobLibService.repo.updateAndReturn(
      { ulid: validatedInputs.id },
      {
        title: validatedInputs.title,
        description: validatedInputs.description,
      },
      true,
    )) as IJob;
  }
}
