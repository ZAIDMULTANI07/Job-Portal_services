import { Dispatch, ListensTo } from '@libs/boat';
import { Injectable } from '@nestjs/common';
import {
  CandidateAppliedJob,
  JobAppliedByCandidate,
} from '../events/applyJobEvent';
@Injectable()
export class EventListener {
  @ListensTo(CandidateAppliedJob.name)
  async candidateEventListener(data) {
    Dispatch({
      job: 'SEND_MAIL_TO_RECRUITER',
      data,
    });
  }
  @ListensTo(JobAppliedByCandidate.name)
  async recruiterEventListener(data) {
    Dispatch({
      job: 'SEND_MAIL_TO_CANDIDATE',
      data,
    });
  }
}
