export interface Employer {
  id: number;
  companyName: string;
  companyLogo: string;
  yearOfFounding: string;
  aboutCompany: string;
  email: string;
  password: string;

  location: { id?: number; name?: string; } | null;
  numberOfEmployees: { id?: number; numberOfEmployees?: string; } | null;
  industry: { id?: number; name?: string; } | null;
  employerType: { id?: number; type?: string; } | null;
  experience: { id?: number; experience?: string; } | null;
  availability: { id?: number; availability?: string; } | null;
  compensation: { id?: number; compensation?: string; } | null;
  jobTypes: {
    jobType: string;
  }[];
}
