package com.jobapplication.system.application;

import com.jobapplication.system.domain.Industry;
import com.jobapplication.system.infrastructure.IndustryRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IndustryService {

    private IndustryRepo industryRepo;

    @Autowired
    public IndustryService(IndustryRepo industryRepo) {
        this.industryRepo = industryRepo;
    }

    public Industry addIndustry(Industry industry) {
       return industryRepo.save(industry);
    }

    public List<Industry> findAllIndustry() {
        return industryRepo.findAll();
    }

    public Industry updateIndustry(Industry industry) {
        return industryRepo.save(industry);
    }

    public Industry findIndustryById(Long id) {
        return industryRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Industry with id " + id + " was not found"));
    }

    @Transactional
    public void deleteIndustry(Long id) {
        if(!industryRepo.existsById(id)) {
            throw new EntityNotFoundException("Industry by id" + id + "was not found");
        }
        industryRepo.deleteById(id);
    }
}
