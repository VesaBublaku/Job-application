package com.jobapplication.system.application;

import com.jobapplication.system.domain.Experience;
import com.jobapplication.system.infrastructure.ExperienceRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {
    private ExperienceRepo experienceRepo;

    @Autowired
    public ExperienceService(ExperienceRepo experienceRepo) {
        this.experienceRepo = experienceRepo;
    }

    public Experience addExperience(Experience experience) {
        return experienceRepo.save(experience);
    }

    public List<Experience> findAllExperiences() {
        return experienceRepo.findAll();
    }

    public Experience updateExperience(Experience experience) {
       return experienceRepo.save(experience);
    }

    @Transactional
    public Experience findExperienceById(Long id) {
        return experienceRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Experience by id " + id + " was not found"));
    }

    @Transactional
    public void deleteExperience(Long id) {
        if(!experienceRepo.existsById(id)) {
            throw  new EntityNotFoundException("Experience by id " + id + " was not found");
        }
        experienceRepo.deleteById(id);
    }
}
