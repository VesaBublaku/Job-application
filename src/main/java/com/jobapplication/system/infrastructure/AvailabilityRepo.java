package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvailabilityRepo extends JpaRepository<Availability, Long> {
}
