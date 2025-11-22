package com.jobapplication.system.application;

import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.JobApplication;
import com.jobapplication.system.domain.Worker;
import com.jobapplication.system.infrastructure.EmployerRepo;
import com.jobapplication.system.infrastructure.JobApplicationRepo;
import com.jobapplication.system.infrastructure.WorkerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepo jobApplicationRepo;
    private final WorkerRepo workerRepo;
    private final EmployerRepo employerRepo;

    public JobApplicationService(JobApplicationRepo jobApplicationRepo, WorkerRepo workerRepo, EmployerRepo employerRepo) {
        this.jobApplicationRepo = jobApplicationRepo;
        this.workerRepo = workerRepo;
        this.employerRepo = employerRepo;
    }

    public JobApplication apply(Long workerId, Long jobId, Long employerId) {
        Worker worker = workerRepo.findById(workerId).orElseThrow(() -> new RuntimeException("Worker not found"));
        Employer employer = employerRepo.findById(employerId).orElseThrow(() -> new RuntimeException("Employer not found"));

        JobApplication application = new JobApplication();

        application.setWorker(worker);
        application.setJobId(jobId);
        application.setEmployer(employer);
        application.setStatus("PENDING");

        return jobApplicationRepo.save(application);
    }

    public List<JobApplication> getWorkerApplications(Long workerId) {
        return jobApplicationRepo.findByWorkerId(workerId);
    }

    public List<JobApplication> getEmployerApplications(Long employerId) {
        return jobApplicationRepo.findByEmployerId(employerId);
    }

    public JobApplication updateStatus(Long appId, String status) {
        JobApplication application = jobApplicationRepo.findById(appId).orElseThrow(() -> new RuntimeException("Application not found"));

        application.setStatus(status.toUpperCase());
        return jobApplicationRepo.save(application);
    }

    public void delete(Long id) {
        if (!jobApplicationRepo.existsById(id)) {
            throw new RuntimeException("Application not found");
        }
        jobApplicationRepo.deleteById(id);
    }
}
