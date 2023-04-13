import { Exists } from '@libs/boat/validator/exists';
import {IsNotEmpty, IsString, MaxLength, Matches, MinLength} from 'class-validator';
export class UpdateJobDTO {
  @Matches(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+=|}{[\-:"<>?';/., ]*$/, {
    message: 'INVALID!',
  })
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @Matches(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+=|}{[\-:"<>?';/., ]*$/, {
    message: 'Invalid!',
  })
  description?: string;

  @Exists({ table: 'jobs', column: 'ulid' })
  id: string;
}

export class JobByIdDTO {
  @IsString()
  @Exists({ table: 'jobs', column: 'ulid' })
  id: string;
}

export class CreateJobDTO {
  @Matches(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+=|}{[\-:"<>?';/., ]*$/, {
    message: 'INVALID!',
  })
  @MinLength(3)
  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @Matches(/^[a-zA-Z][a-zA-Z0-9!@#$%^&*()_+=|}{[\-:"<>?';/., ]*$/, {
    message: 'INVALID!',
  })
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  description: string;
}

export class ApplyJobDTO {
  @Exists({ table: 'jobs', column: 'ulid' })
  @IsNotEmpty()
  jobId: string;
}

export class getApplicationsDTO {}
