import { Inject, Injectable } from '@nestjs/common';
import { ApplicationLibConstants } from '../constants';
import { ApplicationRepositoryContract } from '../repositories/contract';

@Injectable()
export class ApplicationLibService {
  constructor(
    @Inject(ApplicationLibConstants.APPLICATION_REPOSITORY)
    public readonly repo: ApplicationRepositoryContract,
  ) {}
}
