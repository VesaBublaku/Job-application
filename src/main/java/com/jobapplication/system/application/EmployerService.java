package com.jobapplication.system.application;

import com.jobapplication.system.domain.*;
import com.jobapplication.system.infrastructure.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class EmployerService {

    private final EmployerRepo employerRepo;
    private final LocationRepo locationRepo;
    private final NumberOfEmployeesRepo numberOfEmployeesRepo;
    private final IndustryRepo industryRepo;
    private final EmployerTypeRepo employerTypeRepo;
    private final ExperienceService experienceService;
    private final AvailabilityService availabilityService;
    private final CompensationService compensationService;

    public EmployerService(
            EmployerRepo employerRepo,
            LocationRepo locationRepo,
            NumberOfEmployeesRepo numberOfEmployeesRepo,
            IndustryRepo industryRepo,
            EmployerTypeRepo employerTypeRepo,
            ExperienceService experienceService, AvailabilityService availabilityService, CompensationService compensationService) {
        this.employerRepo = employerRepo;
        this.locationRepo = locationRepo;
        this.numberOfEmployeesRepo = numberOfEmployeesRepo;
        this.industryRepo = industryRepo;
        this.employerTypeRepo = employerTypeRepo;
        this.experienceService = experienceService;
        this.availabilityService = availabilityService;
        this.compensationService = compensationService;
    }

    public Employer addEmployer(EmployerDTO dto, MultipartFile logo) {
        try {
            Employer employer = new Employer();
            employer.setCompanyName(dto.getCompanyName());
            employer.setYearOfFounding(dto.getYearOfFounding());
            employer.setAboutCompany(dto.getAboutCompany());
            employer.setEmail(dto.getEmail());
            if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
                employer.setPassword(hashPassword(dto.getPassword()));
            }

            if (dto.getLocationId() != null)
                employer.setLocation(locationRepo.findById(dto.getLocationId()).orElse(null));
            if (dto.getNumberOfEmployeesId() != null)
                employer.setNumberOfEmployees(numberOfEmployeesRepo.findById(dto.getNumberOfEmployeesId()).orElse(null));
            if (dto.getIndustryId() != null)
                employer.setIndustry(industryRepo.findById(dto.getIndustryId()).orElse(null));
            if (dto.getEmployerTypeId() != null)
                employer.setEmployerType(employerTypeRepo.findById(dto.getEmployerTypeId()).orElse(null));
            if (dto.getExperienceId() != null)
                employer.setExperience(experienceService.findExperienceById(dto.getExperienceId()));
            if (dto.getAvailabilityId() != null)
                employer.setAvailability(availabilityService.findAvailabilityById(dto.getAvailabilityId()));
            if (dto.getCompensationId() != null)
                employer.setCompensation(compensationService.findCompensationById(dto.getCompensationId()));


            if (logo != null && !logo.isEmpty())
                employer.setCompanyLogo(savePhoto(logo));

            return employerRepo.save(employer);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    public Employer updateEmployer(Long id, Employer updated) {
        Employer employer = employerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employer not found"));

        employer.setCompanyName(updated.getCompanyName());
        employer.setAboutCompany(updated.getAboutCompany());
        employer.setYearOfFounding(updated.getYearOfFounding());
        employer.setEmail(updated.getEmail());

        if (updated.getPassword() != null) {
            employer.setPassword(hashPassword(updated.getPassword()));
        }

        employer.setLocation(updated.getLocation());
        employer.setNumberOfEmployees(updated.getNumberOfEmployees());
        employer.setIndustry(updated.getIndustry());
        employer.setEmployerType(updated.getEmployerType());

        if (updated.getCompanyLogo() != null) {
            employer.setCompanyLogo(updated.getCompanyLogo());
        }

        return employerRepo.save(employer);
    }


    public List<Employer> findAllEmployers() {
        return employerRepo.findAll();
    }

    @Transactional
    public Employer findEmployerById(Long id) {
        return employerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employer not found: " + id));
    }

    @Transactional
    public void deleteEmployer(Long id) {
        if (!employerRepo.existsById(id)) {
            throw new EntityNotFoundException("Employer not found: " + id);
        }
        employerRepo.deleteById(id);
    }

    public String savePhoto(MultipartFile file) {
        try {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path path = java.nio.file.Paths.get("uploads/" + fileName);

            java.nio.file.Files.createDirectories(path.getParent());
            java.nio.file.Files.write(path, file.getBytes());

            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }


    private String hashPassword(String password) {
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashed = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashed) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}

