package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepo extends JpaRepository<Worker, Long> {
    Worker findByEmail(String email);
}
