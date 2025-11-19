package com.jobapplication.system.application;

import com.jobapplication.system.domain.*;
import com.jobapplication.system.infrastructure.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployerService {

    private final EmployerRepo employerRepo;
    private final LocationRepo locationRepo;
    private final NumberOfEmployeesRepo numberOfEmployeesRepo;
    private final IndustryRepo industryRepo;
    private final EmployerTypeRepo employerTypeRepo;
<<<<<<< HEAD
    private final ExperienceRepo experienceRepo;
    private final AvailabilityRepo availabilityRepo;
    private final CompensationRepo compensationRepo;
    private final JobTypeRepo jobTypeRepo;

=======
    private final ExperienceService experienceService;
    private final AvailabilityService availabilityService;
    private final CompensationService compensationService;
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0

    public EmployerService(
            EmployerRepo employerRepo,
            LocationRepo locationRepo,
            NumberOfEmployeesRepo numberOfEmployeesRepo,
            IndustryRepo industryRepo,
            EmployerTypeRepo employerTypeRepo,
<<<<<<< HEAD
            ExperienceRepo experienceRepo,
            AvailabilityRepo availabilityRepo,
            CompensationRepo compensationRepo,
            JobTypeRepo jobTypeRepo
    ) {
=======
            ExperienceService experienceService, AvailabilityService availabilityService, CompensationService compensationService) {
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0
        this.employerRepo = employerRepo;
        this.locationRepo = locationRepo;
        this.numberOfEmployeesRepo = numberOfEmployeesRepo;
        this.industryRepo = industryRepo;
        this.employerTypeRepo = employerTypeRepo;
<<<<<<< HEAD
        this.experienceRepo = experienceRepo;
        this.availabilityRepo = availabilityRepo;
        this.compensationRepo = compensationRepo;
        this.jobTypeRepo = jobTypeRepo;
=======
        this.experienceService = experienceService;
        this.availabilityService = availabilityService;
        this.compensationService = compensationService;
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0
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

<<<<<<< HEAD
            if (dto.getLocationId() != null && dto.getLocationId() > 0)
=======
            if (dto.getLocationId() != null)
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0
                employer.setLocation(locationRepo.findById(dto.getLocationId()).orElse(null));

            if (dto.getIndustryId() != null && dto.getIndustryId() > 0)
                employer.setIndustry(industryRepo.findById(dto.getIndustryId()).orElse(null));

            if (dto.getExperienceId() != null && dto.getExperienceId() > 0)
                employer.setExperience(experienceRepo.findById(dto.getExperienceId()).orElse(null));

            if (dto.getAvailabilityId() != null && dto.getAvailabilityId() > 0)
                employer.setAvailability(availabilityRepo.findById(dto.getAvailabilityId()).orElse(null));

            if (dto.getCompensationId() != null && dto.getCompensationId() > 0)
                employer.setCompensation(compensationRepo.findById(dto.getCompensationId()).orElse(null));

            if (dto.getNumberOfEmployeesId() != null && dto.getNumberOfEmployeesId() > 0)
                employer.setNumberOfEmployees(numberOfEmployeesRepo.findById(dto.getNumberOfEmployeesId()).orElse(null));

            if (dto.getEmployerTypeId() != null && dto.getEmployerTypeId() > 0)
                employer.setEmployerType(employerTypeRepo.findById(dto.getEmployerTypeId()).orElse(null));
            if (dto.getExperienceId() != null)
                employer.setExperience(experienceService.findExperienceById(dto.getExperienceId()));
            if (dto.getAvailabilityId() != null)
                employer.setAvailability(availabilityService.findAvailabilityById(dto.getAvailabilityId()));
            if (dto.getCompensationId() != null)
                employer.setCompensation(compensationService.findCompensationById(dto.getCompensationId()));


            if (dto.getJobTypes() != null) {
                List<JobType> types = dto.getJobTypes().stream()
                        .map(j -> jobTypeRepo.findByJobType(j.getJobType()))
                        .collect(Collectors.toList());
                employer.setJobTypes(types);
            }
            if (logo != null && !logo.isEmpty() && logo.getSize() > 0) {
                employer.setCompanyLogo(savePhoto(logo));
            }

            return employerRepo.save(employer);

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

<<<<<<< HEAD

    public Employer updateEmployer(Long id, EmployerDTO dto, MultipartFile logo) {
=======
    public Employer updateEmployer(Long id, Employer updated) {
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0
        Employer employer = employerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employer not found"));

        employer.setCompanyName(dto.getCompanyName());
        employer.setAboutCompany(dto.getAboutCompany());
        employer.setYearOfFounding(dto.getYearOfFounding());
        employer.setEmail(dto.getEmail());

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            employer.setPassword(hashPassword(dto.getPassword()));
        }

        if (dto.getLocationId() != null && dto.getLocationId() > 0)
            employer.setLocation(locationRepo.findById(dto.getLocationId()).orElse(null));

        if (dto.getIndustryId() != null && dto.getIndustryId() > 0)
            employer.setIndustry(industryRepo.findById(dto.getIndustryId()).orElse(null));

        if (dto.getExperienceId() != null && dto.getExperienceId() > 0)
            employer.setExperience(experienceRepo.findById(dto.getExperienceId()).orElse(null));

        if (dto.getAvailabilityId() != null && dto.getAvailabilityId() > 0)
            employer.setAvailability(availabilityRepo.findById(dto.getAvailabilityId()).orElse(null));

        if (dto.getCompensationId() != null && dto.getCompensationId() > 0)
            employer.setCompensation(compensationRepo.findById(dto.getCompensationId()).orElse(null));

        if (dto.getNumberOfEmployeesId() != null && dto.getNumberOfEmployeesId() > 0)
            employer.setNumberOfEmployees(numberOfEmployeesRepo.findById(dto.getNumberOfEmployeesId()).orElse(null));

        if (dto.getEmployerTypeId() != null && dto.getEmployerTypeId() > 0)
            employer.setEmployerType(employerTypeRepo.findById(dto.getEmployerTypeId()).orElse(null));

        if (dto.getJobTypes() != null) {
            List<JobType> types = dto.getJobTypes().stream()
                    .map(j -> jobTypeRepo.findByJobType(j.getJobType()))
                    .collect(Collectors.toList());
            employer.setJobTypes(types);
        }

        if (logo != null && !logo.isEmpty() && logo.getSize() > 0) {
            employer.setCompanyLogo(savePhoto(logo));
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
            Path uploadDir = Paths.get(System.getProperty("user.dir"), "uploads");

            Files.createDirectories(uploadDir);

<<<<<<< HEAD
            Path filePath = uploadDir.resolve(fileName);

            Files.write(filePath, file.getBytes());

=======
>>>>>>> 5344bf1aeb04c073805bf138f7b99f632d897da0
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

