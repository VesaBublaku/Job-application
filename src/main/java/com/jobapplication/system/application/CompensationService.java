package com.jobapplication.system.application;

import com.jobapplication.system.domain.Compensation;
import com.jobapplication.system.infrastructure.CompensationRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompensationService {
    private CompensationRepo compensationRepo;

    @Autowired
    public CompensationService(CompensationRepo compensationRepo) {
        this.compensationRepo = compensationRepo;
    }

    public Compensation addCompensation(Compensation compensation) {
        return compensationRepo.save(compensation);
    }

    public List<Compensation> findAllCompensation() {
        return compensationRepo.findAll();
    }

    public Compensation updateCompensation(Compensation compensation) {
        return compensationRepo.save(compensation);
    }

    @Transactional
    public Compensation findCompensationById(Long id) {
        return compensationRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Compensation by id" + id + " was not found"));
    }

    @Transactional
    public void deleteCompensationById(Long id) {
        if(!compensationRepo.existsById(id)) {
            throw new EntityNotFoundException("Compensation by id" + id + " was not found");
        }
        compensationRepo.deleteById(id);
    }
}
