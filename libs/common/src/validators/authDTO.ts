import { Exists } from '@libs/boat/validator/exists';
import { IsUnique } from '@libs/boat/validator/isUnique';
import { IsValidEmail } from '@libs/boat/validator/isValidEmail';
import { IsValueFromConfig } from '@libs/boat/validator/isValueFromConfig';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDTO {
  @Transform(({ value }) => {
    return value.toString().toLowerCase();
  })
  @Exists({ table: 'users', column: 'email' })
  @Matches(/^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-z]{2,3}/, {
    message: 'Invalid Email Id!',
  })
  @IsString()
  @IsEmail({}, { message: 'Invalid Email Id!' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserDTO {
  @MaxLength(50)
  @MinLength(3)
  @Matches(/^[a-zA-Z\d]+([A-Za-z\d]+[ ]{1})*([a-zA-Z\d])+$/, {
    message: 'Invalid Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => {
    return value.toString().toLowerCase();
  })
  @Matches(/^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-z]{2,3}/, {
    message: 'Invalid Email Id!',
  })
  @IsUnique({ table: 'users', column: 'email' })
  @IsEmail({}, { message: 'Invalid Email Id!' })
  @IsString()
  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @IsValueFromConfig(
    { key: 'settings.users.roles' },
    { message: 'please provide a valid role -: 1: candidate, 2: recruiter' },
  )
  @IsNumber()
  @IsNotEmpty()
  role: number;
}

export class ForgotPasswordDTO {
  @Transform(({ value }) => {
    return value.toString().toLowerCase();
  })
  @IsEmail()
  @Matches(/^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-z]{2,3}/, {
    message: 'Invalid Email Id!',
  })
  @Exists({ table: 'users', column: 'email' })
  @IsEmail({}, { message: 'Invalid Email Id!' })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @Matches(/^\d{6}$/, {
    message: 'Invalid OTP',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @Transform(({ value }) => {
    return value.toString().toLowerCase();
  })
  @Matches(/^[a-zA-Z0-9.-]+@[a-zA-Z]+\.[a-z]{2,3}/, {
    message: 'Invalid Email Id!',
  })
  @Exists({ table: 'users', column: 'email' })
  @IsEmail({}, { message: 'Invalid Email Id!' })
  @IsString()
  email: string;
}
