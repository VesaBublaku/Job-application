package com.jobapplication.system.infrastructure;

import com.jobapplication.system.domain.Profession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfessionRepo extends JpaRepository<Profession, Long> {
}
