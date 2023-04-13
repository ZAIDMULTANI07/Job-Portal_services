import { Job } from '@libs/boat';
import { Mailman } from '@libs/boat/mailman/src';
import { Injectable } from '@nestjs/common';
import { CandidateMail } from './mailMessage';
import { RecruiterMail } from './mailMessage';
@Injectable()
export class CandidateNotificationService {
  @Job('SEND_MAIL_TO_CANDIDATE')
  async sampleMethod(data: Record<string, any>) {
    const mail = new CandidateMail('MAIL');
    try {
      await Mailman.init().to(data.data.applicantEmail).send(mail);
    } catch (error) {
      console.log(error);
    }
  }
}
export class RecruiterNotificationService {
  @Job('SEND_MAIL_TO_RECRUITER')
  async sampleMethod(data: Record<string, any>) {
    const mail = new RecruiterMail('MAIL');
    try{
      await Mailman.init().to(data.data.recruiterEmail).send(mail);
    } catch(error){
      console.log(error)
    }
    
  }
}
