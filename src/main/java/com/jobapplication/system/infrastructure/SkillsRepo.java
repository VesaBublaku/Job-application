package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Skills;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillsRepo extends JpaRepository<Skills, Long> {
}
