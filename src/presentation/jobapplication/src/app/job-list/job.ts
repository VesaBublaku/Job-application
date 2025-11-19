export interface Employer {
  id: number;
  companyName: string;
  companyLogo: string;
  yearOfFounding: string;
  aboutCompany: string;
  email: string;
  password: string;

  location: {
    id: number;
    name: string;
  };
  numberOfEmployees: {
    id: number;
    numberOfEmployees: string;
  };
  industry: {
    id: number;
    name: string;
  };
  employerType: {
    id: number;
    type: string;
  };
  experience: {
    id: number;
    experience: string;
  };
  availability: {
    id: number;
    availability: string;
  };
  compensation: {
    id: number;
    compensation: string;
  };
  jobTypes: {
    jobType: string;
  }[];
}
