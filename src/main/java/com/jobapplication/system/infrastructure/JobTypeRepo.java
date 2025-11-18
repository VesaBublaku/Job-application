package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.JobType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobTypeRepo extends JpaRepository<JobType, Long> {
}
