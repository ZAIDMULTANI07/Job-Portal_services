import { MailMessage } from '@libs/boat/mailman/src';
export class ForgetPasswordMail extends MailMessage {
  constructor(private data: Object) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `OTP SENT`;
    return this.subject(subject).line(
      `Your OTP for password reset is :- ${this.data}`,
    );
  }
}
export class ResetPasswordMail extends MailMessage {
  constructor(private data: Object) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Password Reset Successfull`;
    return this.subject(subject).line(`Password Reset Successfull!`);
  }
}
