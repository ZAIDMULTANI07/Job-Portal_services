import { EmitsEvent, Event } from '@libs/boat';
import { IEvent } from '@libs/common/interfaces/event';

@Event(CandidateAppliedJob.name)
export class CandidateAppliedJob extends EmitsEvent {
  public data: IEvent;
  constructor(data) {
    super();
    this.data = data;
  }
}
@Event(JobAppliedByCandidate.name)
export class JobAppliedByCandidate extends EmitsEvent {
  public data: IEvent;
  constructor(data) {
    super();
    this.data = data;
  }
}
