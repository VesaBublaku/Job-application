package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployerRepo extends JpaRepository<Employer, Long> {
    Employer findByEmail(String email);
    List<Employer> findTop4ByOrderByIdDesc();
    List<Employer> findByCreatedByEmployerId(Long createdByEmployerId);

    @Query("""
        SELECT DISTINCT e FROM Employer e
        LEFT JOIN e.jobTypes jt
        WHERE (:companyName IS NULL OR LOWER(e.companyName) LIKE LOWER(CONCAT('%', :companyName, '%')))
        AND (:industryId IS NULL OR e.industry.id = :industryId)
        AND (:compensationId IS NULL OR e.compensation.id = :compensationId)
        AND (:availabilityId IS NULL OR e.availability.id = :availabilityId)
        AND (:experienceId IS NULL OR e.experience.id = :experienceId)
        AND (:locationId IS NULL OR e.location.id = :locationId)
        AND (:jobTypeId IS NULL OR jt.id = :jobTypeId)
    """)
    List<Employer> searchEmployers(
            @Param("companyName") String companyName,
            @Param("industryId") Long industryId,
            @Param("compensationId") Long compensationId,
            @Param("jobTypeId") Long jobTypeId,
            @Param("availabilityId") Long availabilityId,
            @Param("experienceId") Long experienceId,
            @Param("locationId") Long locationId
    );

    @Query("""
    SELECT e
    FROM Employer e
    WHERE e.id = :id
       OR e.createdByEmployerId = :id
""")
    List<Employer> findDashboardEmployers(@Param("id") Long id);


}
