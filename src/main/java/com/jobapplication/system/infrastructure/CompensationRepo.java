package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Compensation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompensationRepo extends JpaRepository<Compensation, Long> {
}
