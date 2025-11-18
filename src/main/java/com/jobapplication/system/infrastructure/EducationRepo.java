package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Education;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EducationRepo extends JpaRepository<Education, Long> {
}
