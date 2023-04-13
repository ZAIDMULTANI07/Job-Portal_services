import { MailMessage } from '@libs/boat/mailman/src';
export class CandidateMail extends MailMessage {
  constructor(private data: Object) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `Application Submitted`;
    return this.subject(subject).line(`Application Submitted!`);
  }
}

export class RecruiterMail extends MailMessage {
  constructor(private data: Object) {
    super();
  }
  async handle(): Promise<MailMessage> {
    const subject = `New Application recieved`;
    return this.subject(subject).line(`New Application recived!`);
  }
}
