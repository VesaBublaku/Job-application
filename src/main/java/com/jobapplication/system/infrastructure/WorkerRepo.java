package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WorkerRepo extends JpaRepository<Worker, Long> {
    Worker findByEmail(String email);

    @Query("""
        SELECT DISTINCT w FROM Worker w
        LEFT JOIN w.professions p
        LEFT JOIN w.jobTypes jt
        WHERE (:professionId IS NULL OR p.id = :professionId)
        AND (:jobTypeId IS NULL OR jt.id = :jobTypeId)
        AND (:compensationId IS NULL OR w.compensation.id = :compensationId)
        AND (:availabilityId IS NULL OR w.availability.id = :availabilityId)
        AND (:experienceId IS NULL OR w.experience.id = :experienceId)
        AND (:educationId IS NULL OR w.education.id = :educationId)
        AND (:locationId IS NULL OR w.location.id = :locationId)
    """)
    List<Worker> searchWorkers(
            Long professionId,
            Long jobTypeId,
            Long compensationId,
            Long availabilityId,
            Long experienceId,
            Long educationId,
            Long locationId
    );

    List<Worker> findTop4ByOrderByCreatedAtDesc();
}
