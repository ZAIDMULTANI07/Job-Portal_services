import { EmitsEvent, Event } from '@libs/boat';
import { IEvent } from '@libs/common/interfaces/event';

@Event(ForgetPasswordEvent.name)
export class ForgetPasswordEvent extends EmitsEvent {
  public data: IEvent;
  constructor(data) {
    super();
    this.data = data;
  }
}
@Event(ResetPassword.name)
export class ResetPassword extends EmitsEvent {
  public data:IEvent;
  constructor(data) {
    super();
    this.data = data;
  }
}
