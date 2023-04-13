import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import { ForgetPasswordEvent, ResetPassword } from '../events/passwordEvent';

@Injectable()
export class EventListener {
  @ListensTo(ForgetPasswordEvent.name)
  async forgotPasswordEmailListener(event: ForgetPasswordEvent) {
    const { data } = event;
    Dispatch({
      job: 'SEND_OTP_TO_USER',
      data,
    });
  }

  @ListensTo(ResetPassword.name)
  async resetPassword(data) {
    Dispatch({
      job: 'SEND_MAIL_TO_USER',
      data,
    });
  }
}
