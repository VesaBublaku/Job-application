package com.jobapplication.system.application;

import com.jobapplication.system.domain.Worker;
import com.jobapplication.system.domain.WorkerDTO;
import com.jobapplication.system.infrastructure.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WorkerService {

    private  WorkerRepo workerRepo;
    private  LocationRepo locationRepo;
    private  EducationRepo educationRepo;
    private  ExperienceRepo experienceRepo;
    private  ProfessionRepo professionRepo;
    private  JobTypeRepo jobTypeRepo;
    private  SkillsRepo skillsRepo;
    private  CompensationRepo compensationRepo;
    private  AvailabilityRepo availabilityRepo;

    public WorkerService(
            WorkerRepo workerRepo,
            LocationRepo locationRepo,
            EducationRepo educationRepo,
            ExperienceRepo experienceRepo,
            ProfessionRepo professionRepo,
            JobTypeRepo jobTypeRepo,
            SkillsRepo skillsRepo,
            CompensationRepo compensationRepo,
            AvailabilityRepo availabilityRepo
    ) {
        this.workerRepo = workerRepo;
        this.locationRepo = locationRepo;
        this.educationRepo = educationRepo;
        this.experienceRepo = experienceRepo;
        this.professionRepo = professionRepo;
        this.jobTypeRepo = jobTypeRepo;
        this.skillsRepo = skillsRepo;
        this.compensationRepo = compensationRepo;
        this.availabilityRepo = availabilityRepo;
    }

    public Worker addWorker(WorkerDTO dto, MultipartFile photo) {
        Worker worker = new Worker();
        worker.setFirstName(dto.getFirstName());
        worker.setLastName(dto.getLastName());
        worker.setEmail(dto.getEmail());
        worker.setPassword(hashPassword(dto.getPassword()));
        worker.setAboutYou(dto.getAboutYou());
        worker.setDateOfBirth(dto.getDateOfBirth());

        worker.setLocation(findEntityOrThrow(locationRepo, dto.getLocationId(), "Location"));
        worker.setEducation(findEntityOrThrow(educationRepo, dto.getEducationId(), "Education"));
        worker.setExperience(findEntityOrThrow(experienceRepo, dto.getExperienceId(), "Experience"));
        worker.setCompensation(findEntityOrThrow(compensationRepo, dto.getCompensationId(), "Compensation"));
        worker.setAvailability(findEntityOrThrow(availabilityRepo, dto.getAvailabilityId(), "Availability"));

        worker.setProfessions(findEntities(professionRepo, dto.getProfessionIds(), "Profession"));
        worker.setJobTypes(findEntities(jobTypeRepo, dto.getJobTypeIds(), "JobType"));
        worker.setSkills(findEntities(skillsRepo, dto.getSkillIds(), "Skill"));

        if (photo != null && !photo.isEmpty()) {
            try {
                worker.setPhoto(Base64.getEncoder().encodeToString(photo.getBytes()));
            } catch (IOException e) {
                throw new RuntimeException("Failed to process photo", e);
            }
        }

        return workerRepo.save(worker);
    }

    public Worker updateWorker(Long id, WorkerDTO dto, MultipartFile photo) {
        Worker worker = workerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Worker not found"));

        worker.setFirstName(dto.getFirstName());
        worker.setLastName(dto.getLastName());
        worker.setAboutYou(dto.getAboutYou());
        worker.setDateOfBirth(dto.getDateOfBirth());
        worker.setEmail(dto.getEmail());

        if (dto.getPassword() != null) {
            worker.setPassword(hashPassword(dto.getPassword()));
        }

        if (photo != null && !photo.isEmpty()) {
            worker.setPhoto(savePhoto(photo)); // Update photo if provided
        }

        worker.setLocation(locationRepo.findById(dto.getLocationId())
                .orElseThrow(() -> new EntityNotFoundException("Location not found")));
        worker.setEducation(educationRepo.findById(dto.getEducationId())
                .orElseThrow(() -> new EntityNotFoundException("Education not found")));
        worker.setExperience(experienceRepo.findById(dto.getExperienceId())
                .orElseThrow(() -> new EntityNotFoundException("Experience not found")));
        worker.setCompensation(compensationRepo.findById(dto.getCompensationId())
                .orElseThrow(() -> new EntityNotFoundException("Compensation not found")));
        worker.setAvailability(availabilityRepo.findById(dto.getAvailabilityId())
                .orElseThrow(() -> new EntityNotFoundException("Availability not found")));

        worker.setProfessions(professionRepo.findAllById(dto.getProfessionIds()));
        worker.setJobTypes(jobTypeRepo.findAllById(dto.getJobTypeIds()));
        worker.setSkills(skillsRepo.findAllById(dto.getSkillIds()));

        return workerRepo.save(worker);
    }

    public List<Worker> findAllWorkers() {
        return workerRepo.findAll();
    }

    @Transactional
    public Worker findWorkerById(Long id) {
        return workerRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Worker not found: " + id));
    }

    @Transactional
    public void deleteWorker(Long id) {
        if (!workerRepo.existsById(id)) {
            throw new EntityNotFoundException("Worker not found: " + id);
        }
        workerRepo.deleteById(id);
    }

    private <T> T findEntityOrThrow(JpaRepository<T, Long> repo, Long id, String name) {
        return repo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(name + " not found with id: " + id));
    }

    private <T> List<T> findEntities(JpaRepository<T, Long> repo, List<Long> ids, String name) {
        if (ids == null || ids.isEmpty()) return List.of();
        List<T> entities = repo.findAllById(ids);
        if (entities.size() != ids.size()) {
            throw new EntityNotFoundException("Some " + name + " IDs are invalid");
        }
        return entities;
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashed = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashed) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    public String savePhoto(MultipartFile photo) {
        try {
            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save photo", e);
        }
    }
}
