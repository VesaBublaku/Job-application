import { Profession } from '../profession/profession.service';
import { JobType } from '../jobType/jobType.service';
import { Skill } from '../worker-profile/worker-profile';
import { JobApplication } from '../job-application/job-application';
import {Skills} from '../skills/skills.service';

export interface Worker {
  id: number;
  firstName: string;
  lastName: string;
  photo: string;
  dateOfBirth: string;
  aboutYou: string;
  email: string;
  password: string;

  location: { id: number; name: string } | null;

  professions: Profession[];
  education: { id: number; education: string } | null;
  experience: { id: number; experience: string } | null;
  jobTypes: JobType[];
  skills: Skills[];

  compensation: { id: number; compensation: string } | null;
  availability: { id: number; availability: string } | null;

  applications: JobApplication[];
}
