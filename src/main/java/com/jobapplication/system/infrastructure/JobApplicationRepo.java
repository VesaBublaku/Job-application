package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplicationRepo extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByWorkerId(Long workerId);
    List<JobApplication> findByEmployerId(Long employerId);
}
