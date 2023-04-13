import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseValidator } from '@libs/boat/validator';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import {
  CreateUserDTO,
  IUser,
  ForgotPasswordDTO,
  LoginUserDTO,
  ResetPasswordDTO,
} from '@libs/common';
import { UserLibService } from '@libs/users';
import { ulid } from 'ulid';
import { ConfigService } from '@nestjs/config';
import { Cache, Dispatch, EmitEvent, Hash } from '@libs/boat';
import { ForgetPasswordEvent, ResetPassword } from '../events/passwordEvent';
import { toString } from 'lodash';

@Injectable()
export class AuthApisService {
  constructor(
    private readonly userLibService: UserLibService,
    private readonly validator: BaseValidator,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(inputs: CreateUserDTO): Promise<IUser> {
    let validatedInputs = await this.validator.fire(inputs, CreateUserDTO);
    let { password } = inputs;
    validatedInputs['password'] = await bcrypt.hash(password, 10);
    validatedInputs['ulid'] = ulid();

    const user = await this.userLibService.repo.create(validatedInputs);
    const token = await this.jwt.signAsync({ sub: user.id });
    return { ...user, token };
  }

  async login(inputs: LoginUserDTO): Promise<IUser> {
    let validatedInputs = await this.validator.fire(inputs, LoginUserDTO);
    const { email, password } = validatedInputs;
    const user = await this.userLibService.repo
      .query()
      .findOne({ email })
      .whereIn('role', [1, 2]);
    if (!user) throw new UnauthorizedException('User does not exists');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await this.jwt.signAsync({ sub: user.id });
    return { ...user, token };
  }

  async forgot(inputs: ForgotPasswordDTO): Promise<void> {
    let validatedInputs = await this.validator.fire(inputs, ForgotPasswordDTO);
    const otp = toString(Math.floor(Math.random() * (999999-100000 + 1))+ 100000)
    const store = Cache.store('redis');
    await store.set(validatedInputs.email, otp.toString(), 600);
    await EmitEvent(
      new ForgetPasswordEvent({
        email: validatedInputs.email,
        otp: otp,
      }),
    );
  }

  async reset(inputs: ResetPasswordDTO, user: IUser): Promise<void> {
    let validatedInputs = await this.validator.fire(inputs, ResetPasswordDTO);
    const store = Cache.store('redis');
    const val = await store.get(validatedInputs.email);
    const users = await this.userLibService.repo.firstWhere({
      email: validatedInputs.email,
    });

    if (!val || inputs.otp !== val) {
      throw new UnauthorizedException();
    }
    if (inputs.password !== inputs.confirmPassword) {
      throw new BadRequestException('Password did not match!');
    }
    if (await bcrypt.compare(validatedInputs.password, users.password)) {
      throw new BadRequestException('Password cannot be same as old password');
    }

    const temp = await Hash.make(inputs.password);

    await this.userLibService.repo.updateWhere(
      { email: validatedInputs.email },
      { password: temp },
    );
    EmitEvent(
      new ResetPassword({
        applicantEmail: validatedInputs.email,
        subject: 'Password reset Successfull',
        reset: true,
      }),
    );
  }

  async adminLogin(inputs: LoginUserDTO): Promise<IUser> {
    let validatedInputs = await this.validator.fire(inputs, LoginUserDTO);
    const { email, password } = validatedInputs;
    const user = await this.userLibService.repo.firstWhere({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (user.role !== this.configService.get('settings.allUsers.roles.Admin')) {
      throw new UnauthorizedException();
    }
    const token = await this.jwt.signAsync({ sub: user.id });
    return { ...user, token };
  }
}
