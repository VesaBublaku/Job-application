package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.EmployerType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerTypeRepo extends JpaRepository<EmployerType, Long> {
}
