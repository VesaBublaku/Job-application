package com.jobapplication.system.application;

import com.jobapplication.system.domain.Skills;
import com.jobapplication.system.infrastructure.SkillsRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillsService {
    private SkillsRepo skillsRepo;

    @Autowired
    public SkillsService(SkillsRepo skillsRepo) {
        this.skillsRepo = skillsRepo;
    }

    public Skills addSkills(Skills skills) {
        return skillsRepo.save(skills);
    }

    public List<Skills> findAllSkills() {
        return skillsRepo.findAll();
    }

    public Skills updateSkills(Skills skills) {
        return skillsRepo.save(skills);
    }

    @Transactional
    public Skills findSkillById(Long id) {
        return skillsRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Skill by id " + id + " was not found"));
    }

    @Transactional
    public void deleteSkill(Long id) {
        if(!skillsRepo.existsById(id)) {
            throw new EntityNotFoundException("Skill by id " + id + " was not found");
        }
        skillsRepo.deleteById(id);
    }

    @Transactional
    public List<Skills> findAllByIds(List<Long> ids) {
        if (ids == null || ids.isEmpty()) return List.of();
        return skillsRepo.findAllById(ids);
    }

}
