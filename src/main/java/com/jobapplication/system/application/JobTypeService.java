package com.jobapplication.system.application;

import com.jobapplication.system.domain.JobType;
import com.jobapplication.system.infrastructure.JobTypeRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobTypeService {
    private JobTypeRepo jobTypeRepo;

    @Autowired
    public JobTypeService(JobTypeRepo jobTypeRepo) {
        this.jobTypeRepo = jobTypeRepo;
    }

    public JobType addJobType(JobType jobType) {
        return jobTypeRepo.save(jobType);
    }

    public List<JobType> findAllJobTypes() {
        return jobTypeRepo.findAll();
    }

    public JobType updateJobType(JobType jobType) {
        return jobTypeRepo.save(jobType);
    }

    @Transactional
    public JobType findJobTypeById(Long id) {
        return jobTypeRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Job type by id " + id + "was not found"));
    }

    @Transactional
    public void deleteJobType(Long id) {
        if(!jobTypeRepo.existsById(id)) {
            throw new EntityNotFoundException("Job type by id " + id + "was not found");
        }
        jobTypeRepo.deleteById(id);
    }

}
