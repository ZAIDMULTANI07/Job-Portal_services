import { Job } from '@libs/boat';
import { Mailman } from '@libs/boat/mailman/src';
import { Injectable } from '@nestjs/common';
import { ForgetPasswordMail, ResetPasswordMail } from './mailservice';

@Injectable()
export class ForgetPasswordNotification {
  @Job('SEND_OTP_TO_USER')
  async sampleMethod(data: Record<string, any>) {
    const mail = new ForgetPasswordMail(data.otp);
    const mm = Mailman.init().to(data.email);
    await mm.send(mail);
  }
}

export class ResetPasswordNotification {
  @Job('SEND_MAIL_TO_USER')
  async sampleMethod(data: Record<string, any>) {
    const mail = new ResetPasswordMail('MAIL');
    await Mailman.init().to(data.data.applicantEmail).send(mail);
  }
}
