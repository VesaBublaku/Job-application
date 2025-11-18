package com.jobapplication.system.application;

import com.jobapplication.system.domain.Profession;
import com.jobapplication.system.infrastructure.ProfessionRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.BeanNotOfRequiredTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessionService {
    private ProfessionRepo professionRepo;

    @Autowired
    public ProfessionService(ProfessionRepo professionRepo) {
        this.professionRepo = professionRepo;
    }

    public Profession addProfession(Profession profession) {
        return professionRepo.save(profession);
    }

    public List<Profession> findAllProfessions() {
        return professionRepo.findAll();
    }

    public Profession updateProfession(Profession profession) {
        return professionRepo.save(profession);
    }

    @Transactional
    public Profession findProfessionById(Long id) {
        return professionRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Profession by id " + id + " was not found"));
    }

    @Transactional
    public void deleteProfession(Long id) {
        if(!professionRepo.existsById(id)) {
            throw  new EntityNotFoundException("Profession by id " + id + " was not found");
        }
        professionRepo.deleteById(id);
    }
}
