package com.jobapplication.system.application;

import com.jobapplication.system.domain.JobApplication;
import com.jobapplication.system.domain.Worker;
import com.jobapplication.system.infrastructure.JobApplicationRepo;
import com.jobapplication.system.infrastructure.WorkerRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepo jobApplicationRepo;
    private final WorkerRepo workerRepo;

    public JobApplicationService(JobApplicationRepo jobApplicationRepo, WorkerRepo workerRepo) {
        this.jobApplicationRepo = jobApplicationRepo;
        this.workerRepo = workerRepo;
    }

    public JobApplication apply(Long workerId, Long jobId, Long employerId) {
        Worker worker = workerRepo.findById(workerId).orElseThrow(() -> new RuntimeException("Worker not found"));

        JobApplication application = new JobApplication();

        application.setWorker(worker);
        application.setJobId(jobId);
        application.setEmployerId(employerId);
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
}
