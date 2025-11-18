package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Industry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IndustryRepo extends JpaRepository<Industry, Long> {
}
