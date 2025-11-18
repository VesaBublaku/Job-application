package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Employer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployerRepo extends JpaRepository<Employer, Long> {
}
