import { BaseValidator } from '@libs/boat/validator';
import { ApplyJobDTO, IApplications, IUser, JobByIdDTO } from '@libs/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ulid } from 'ulid';
import { Pagination } from '@squareboat/nestjs-objection';
import { JobLibService } from '@lib/jobs';
import { EmitEvent } from '@libs/boat';
import {
  CandidateAppliedJob,
  JobAppliedByCandidate,
} from '../events/applyJobEvent';
import { PaginationDTO } from '@libs/common/validators/userDTO';
import { UserLibService } from '@libs/users';
import { ApplicationLibService } from '@libs/applications';

@Injectable()
export class ApplicationApisService {
  constructor(
    private readonly applicationService: ApplicationLibService,
    private readonly validator: BaseValidator,
    private readonly jobLibService: JobLibService,
    private readonly userLibService: UserLibService,
  ) {}

  async applyJob(input: ApplyJobDTO, user: IUser): Promise<IApplications> {
    let validatedInputs = await this.validator.fire(input, ApplyJobDTO);
    const job = await this.jobLibService.repo.firstWhere({
      ulid: validatedInputs.jobId,
    });
    const recruiter = await this.userLibService.repo.firstWhere({
      id: job.userId,
    });
    const jobCheck = await this.applicationService.repo.firstWhere(
      {
        userId: user.id,
        jobId: job.id,
      },
      false,
    );
    if (jobCheck) throw new BadRequestException('Already applied to this job!');
    const application = await this.applicationService.repo.create({
      jobId: job.id,
      userId: user.id,
      ulid: ulid(),
    });
    await EmitEvent(
      new CandidateAppliedJob({
        recruiterEmail: recruiter.email,
        job: job,
      }),
    );
    await EmitEvent(
      new JobAppliedByCandidate({ applicantEmail: user.email, job: job }),
    );
    return application;
  }

  async getAllApplications(
    inputs: PaginationDTO,
    user: IUser,
  ): Promise<Pagination<IApplications>> {
    const validatedInputs = await this.validator.fire(inputs, PaginationDTO);
    return await this.applicationService.repo.search(
      { ...validatedInputs, eager: { job: true } },
      user,
    );
  }
}
