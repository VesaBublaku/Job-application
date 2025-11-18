package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepo extends JpaRepository<Experience, Long> {
}
