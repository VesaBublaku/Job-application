import { Profession } from '../profession/profession.service';
import { JobType } from '../jobType/jobType.service';
import { Skill } from '../worker-profile/worker-profile';
import { JobApplication } from '../job-application/job-application';

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  dateOfBirth: string;
  aboutYou: string;
  email: string;
  password: string;

  location: { id: number; name: string; };

  profession: Profession[];

  education: { id: number; education: string; };
  experience: { id: number; experience: string; };
  jobTypes: JobType[];
  skills: Skill[];

  compensation: { id: number; compensation: string; };
  availability: { id: number; availability: string; };

  applications: JobApplication[];
}
