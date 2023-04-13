import { ObjectionModel } from "@squareboat/nestjs-objection";
import { IJob } from "./job";

export interface IEvent extends ObjectionModel {

    recruiterEmail?: string,
    applicantEmail?: string,
    Job?: IJob
    email?: string,
    otp?: string,
    subject?: string,
    reset?: boolean
}