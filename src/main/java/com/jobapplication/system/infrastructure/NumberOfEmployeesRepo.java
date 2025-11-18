package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.NumberOfEmployees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NumberOfEmployeesRepo extends JpaRepository<NumberOfEmployees, Long> {
}
