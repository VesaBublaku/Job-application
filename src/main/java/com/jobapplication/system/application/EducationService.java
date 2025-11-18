package com.jobapplication.system.application;

import com.jobapplication.system.domain.Education;
import com.jobapplication.system.infrastructure.EducationRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {
    private EducationRepo educationRepo;

    @Autowired
    public EducationService(EducationRepo educationRepo) {
        this.educationRepo = educationRepo;
    }

    public Education addEducation(Education education) {
        return educationRepo.save(education);
    }

    public List<Education> findAllEducation() {
        return educationRepo.findAll();
    }

    public Education updateEducation(Education education) {
        return educationRepo.save(education);
    }

    @Transactional
    public Education findEducationByID(Long id) {
        return educationRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Education by id " + id + " was not found"));
    }

    @Transactional
    public void deleteEducation(Long id) {
        if(!educationRepo.existsById(id)) {
            throw new EntityNotFoundException("Education by id " + id + " was not found");
        }
        educationRepo.deleteById(id);
    }
}
