package com.jobapplication.system.application;

import com.jobapplication.system.domain.EmployerType;
import com.jobapplication.system.domain.NumberOfEmployees;
import com.jobapplication.system.infrastructure.EmployerTypeRepo;
import com.jobapplication.system.infrastructure.NumberOfEmployeesRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerTypeService {

    private EmployerTypeRepo employerTypeRepo;

    @Autowired
    public EmployerTypeService(EmployerTypeRepo employerTypeRepo) {
        this.employerTypeRepo = employerTypeRepo;
    }

    public EmployerType addEmployerType(EmployerType employerType) {
        return employerTypeRepo.save(employerType);
    }

    public List<EmployerType> findAllEmployerTypes() {
        return employerTypeRepo.findAll();
    }

    public EmployerType updateEmployerType(EmployerType employerType) {
        return employerTypeRepo.save(employerType);
    }

    public EmployerType findEmployerTypeById(Long id) {
        return employerTypeRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employer type with id" + id + "was not found"));
    }

    @Transactional
    public void deleteEmployerType(Long id) {
        if(!employerTypeRepo.existsById(id)) {
            throw new EntityNotFoundException("Employer type with id" + id + "was not found");
        }
        employerTypeRepo.deleteById(id);
    }
}
