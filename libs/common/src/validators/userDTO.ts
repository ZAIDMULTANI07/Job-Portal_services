import { Exists } from '@libs/boat/validator/exists';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { ULID, ulid } from 'ulid';

export class UserDTO {
  @Exists({ table: 'users', column: 'ulid' })
  id: string;
}

export class PaginationDTO {
  @IsPositive()
  @Min(1)
  @Transform(({ value }) => +value)
  @IsOptional()
  page: number;

  @IsPositive()
  @Min(1)
  @Transform(({ value }) => +value)
  @IsOptional()
  perPage: number;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  q: string;
}
