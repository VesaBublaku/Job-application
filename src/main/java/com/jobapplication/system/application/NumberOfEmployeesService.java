package com.jobapplication.system.application;

import com.jobapplication.system.domain.Industry;
import com.jobapplication.system.domain.NumberOfEmployees;
import com.jobapplication.system.infrastructure.IndustryRepo;
import com.jobapplication.system.infrastructure.NumberOfEmployeesRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NumberOfEmployeesService {

    private NumberOfEmployeesRepo numberOfEmployeesRepo;

    @Autowired
    public NumberOfEmployeesService(NumberOfEmployeesRepo numberOfEmployeesRepo) {
        this.numberOfEmployeesRepo = numberOfEmployeesRepo;
    }

    public NumberOfEmployees addNumberOfEmployees(NumberOfEmployees numberOfEmployees) {
        return numberOfEmployeesRepo.save(numberOfEmployees);
    }

    public List<NumberOfEmployees> findAllNumberOfEmployees() {
        return numberOfEmployeesRepo.findAll();
    }

    public NumberOfEmployees updateNumberOfEmployees(NumberOfEmployees numberOfEmployees) {
        return numberOfEmployeesRepo.save(numberOfEmployees);
    }

    public NumberOfEmployees findNumberOfEmployeesById(Long id) {
        return numberOfEmployeesRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Number of employees with id" + id + "was not found"));
    }

    @Transactional
    public void deleteNumberOfEmployees(Long id) {
        if(!numberOfEmployeesRepo.existsById(id)) {
            throw new EntityNotFoundException("Number of employees with id" + id + "was not found");
        }
        numberOfEmployeesRepo.deleteById(id);
    }
}
