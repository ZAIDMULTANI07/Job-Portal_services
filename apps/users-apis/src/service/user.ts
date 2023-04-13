import { JobLibService, JobModel } from '@lib/jobs';
import { ApplicationLibService } from '@libs/applications';
import { BaseValidator } from '@libs/boat/validator';
import { IUser } from '@libs/common';
import { PaginationDTO, UserDTO } from '@libs/common/validators/userDTO';
import { UserLibService } from '@libs/users';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pagination } from '@squareboat/nestjs-objection';

@Injectable()
export class UserApisServices {
  constructor(
    private readonly validator: BaseValidator,
    private readonly userLibService: UserLibService,
    private readonly configService: ConfigService,
    private readonly jobLibService: JobLibService,
    private readonly applicationLibService: ApplicationLibService,
  ) {}

  async deleteUserById(inputs: UserDTO): Promise<boolean> {
    const validatedInputs = await this.validator.fire(inputs, UserDTO);
    const user = await this.userLibService.repo.firstWhere({
      ulid: validatedInputs.id,
    });
    if (
      this.configService.get('settings.users.roles.Recruiter') === +user.role
    ) {
      JobModel.relatedQuery('applications').delete().where('userId', user.id);
      await this.jobLibService.repo.deleteWhere({
        userId: user.id,
      });
    } else {
      await this.applicationLibService.repo.deleteWhere({
        userId: user.id,
      });
    }
    return await this.userLibService.repo.deleteWhere({
      ulid: validatedInputs.id,
    });
  }

  async getAllUsers(
    inputs: PaginationDTO,
    user: IUser,
  ): Promise<Pagination<IUser>> {
    const validatedInputs = await this.validator.fire(inputs, PaginationDTO);
    return await this.userLibService.repo.search(validatedInputs, user);
  }
}
