package com.jobapplication.system.presentation;

import com.jobapplication.system.application.JobApplicationService;
import com.jobapplication.system.domain.JobApplication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4201"})
@RestController
@RequestMapping("/application")
public class JobApplicationResource {

    private final JobApplicationService jobApplicationService;

    public JobApplicationResource(JobApplicationService jobApplicationService) {
        this.jobApplicationService = jobApplicationService;
    }

    @GetMapping("/all")
    public List<JobApplication> getAll() {
        return jobApplicationService.getAll();
    }

    @PostMapping("/apply")
    public JobApplication apply(@RequestParam Long workerId, @RequestParam Long jobId, @RequestParam Long employerId) {
        return jobApplicationService.apply(workerId, jobId, employerId);
    }

    @GetMapping("/worker/{workerId}")
    public List<JobApplication> workerApplications(@PathVariable Long workerId) {
        return jobApplicationService.getWorkerApplications(workerId);
    }

    @GetMapping("/employer/{employerId}")
    public List<JobApplication> employerApplications(@PathVariable Long employerId) {
        return jobApplicationService.getEmployerApplications(employerId);
    }

    @PutMapping("/{id}/status")
    public JobApplication updateStatus(@PathVariable Long id, @RequestParam String status) {
        return jobApplicationService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable Long id) {
        jobApplicationService.delete(id);
    }
}
