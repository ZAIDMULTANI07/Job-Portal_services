import { IsNotEmpty, IsUUID, isNotEmpty } from 'class-validator';

export class CreateApplicationDTO {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  application_id: string;

  @IsNotEmpty()
  @IsUUID()
  ulid: string;
}
