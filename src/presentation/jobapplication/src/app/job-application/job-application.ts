import {Worker} from '../worker-list/worker';
import {Employer} from '../job-list/job';

export interface JobApplication {
  id: number;
  worker: Worker;
  employer: Employer;
  jobId: number;
  status: string;
}
