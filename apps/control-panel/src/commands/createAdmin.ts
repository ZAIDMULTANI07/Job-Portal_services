import { UserLibService } from '@libs/users/services/user';
import { Injectable } from '@nestjs/common';
import { Command, ConsoleIO } from '@squareboat/nest-console';
import bcrypt from 'bcrypt';
import { ulid } from 'ulid';

@Injectable()
@Command('seed:admin', {
  desc: 'Command to create seed data for superAdmin table',
})
export class CreateAdmin {
  constructor(private readonly service: UserLibService) {}

  public async handle(_cli: ConsoleIO): Promise<void> {
    try {
      const name = await _cli.ask('Enter Name');
      const email = await _cli.ask('Enter Email');

      const password = await _cli.ask('Enter Password');
      const hashPassword = await bcrypt.hash(password, 10);
      await this.service.repo.create({
        ulid: ulid(),
        name,
        email,
        password: hashPassword,
        role: 0,
      });
      _cli.success('Super Admin Created');
    } catch (error) {
      console.log(error);
    }

    return;
  }
}
