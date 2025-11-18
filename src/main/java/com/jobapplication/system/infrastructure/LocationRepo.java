package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepo extends JpaRepository<Location, Long> {
}
