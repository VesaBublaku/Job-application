import { Routes } from '@angular/router';
import {Signup} from './signup/signup';
import {HomeComponent} from './home/home';
import {EmployerDashboard} from './employer-dashboard/employer-dashboard';
import {WorkerDashboard} from './worker-dashboard/worker-dashboard';
import {SignupEmployer} from './signupemployer/signupemployer';
import {WorkerProfile} from './worker-profile/worker-profile';
import {EditWorkerProfile} from './edit-worker-profile/edit-worker-profile';
import {EmployerProfile} from './employer-profile/employer-profile';
import {EditEmployerProfile} from './edit-employer-profile/edit-employer-profile';
import {ManageJobapplication} from './manage-jobapplication/manage-jobapplication';
import {AboutUs} from './about-us/about-us';
import { JobList } from './job-list/job-list';
import { JobDetails } from './job-details/job-details';
import {WorkerDetails} from './worker-details/worker-details';
import {WorkerList} from './worker-list/worker-list';
import {Login} from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'employer-dashboard', component: EmployerDashboard},
  { path: 'worker-dashboard', component: WorkerDashboard},
  { path: 'signup', component: Signup},
  { path: 'signupemployer', component: SignupEmployer },
  { path: 'worker-profile', component: WorkerProfile},
  { path: 'employer-profile', component: EmployerProfile},
  { path: 'edit-worker-profile', component: EditWorkerProfile},
  { path: 'edit-employer-profile', component: EditEmployerProfile},
  { path: 'manage-jobapplication', component: ManageJobapplication},
  { path: 'about-us', component: AboutUs},
  { path: 'job-list', component: JobList},
  { path: 'job-details', component: JobDetails},
  { path: 'worker-list', component: WorkerList},
  { path: 'worker-details', component: WorkerDetails},
  { path: 'login', component: Login},
];

