package com.jobapplication.system.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobapplication.system.application.WorkerService;
import com.jobapplication.system.domain.Worker;
import com.jobapplication.system.domain.WorkerDTO;
import com.jobapplication.system.infrastructure.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/worker")
public class WorkerResource {

    private final WorkerService workerService;
    private final WorkerRepo workerRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private LocationRepo locationRepo;

    @Autowired
    private EducationRepo educationRepo;

    @Autowired
    private ExperienceRepo experienceRepo;

    @Autowired
    private CompensationRepo compensationRepo;

    @Autowired
    private AvailabilityRepo availabilityRepo;

    @Autowired
    private ProfessionRepo professionRepo;

    @Autowired
    private JobTypeRepo jobTypeRepo;

    @Autowired
    private SkillsRepo skillsRepo;


    public WorkerResource(WorkerService workerService, WorkerRepo workerRepo) {
        this.workerService = workerService;
        this.workerRepo = workerRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addWorker(@RequestParam("worker") String workerJson,
                                       @RequestParam(value = "photo", required = false) MultipartFile photo) {
        try {
            WorkerDTO dto = objectMapper.readValue(workerJson, WorkerDTO.class);

            Worker worker = new Worker();
            worker.setFirstName(dto.getFirstName());
            worker.setLastName(dto.getLastName());
            worker.setAboutYou(dto.getAboutYou());
            worker.setEmail(dto.getEmail());
            worker.setPassword(dto.getPassword());
            worker.setDateOfBirth(dto.getDateOfBirth());

            if (photo != null && !photo.isEmpty()) {
                String filename = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
                Path path = Paths.get("uploads/" + filename);
                Files.createDirectories(path.getParent());
                Files.write(path, photo.getBytes());
                worker.setPhoto(filename);
            }

            if (dto.getLocationId() != null)
                worker.setLocation(locationRepo.findById(dto.getLocationId()).orElse(null));
            if (dto.getEducationId() != null)
                worker.setEducation(educationRepo.findById(dto.getEducationId()).orElse(null));
            if (dto.getExperienceId() != null)
                worker.setExperience(experienceRepo.findById(dto.getExperienceId()).orElse(null));
            if (dto.getCompensationId() != null)
                worker.setCompensation(compensationRepo.findById(dto.getCompensationId()).orElse(null));
            if (dto.getAvailabilityId() != null)
                worker.setAvailability(availabilityRepo.findById(dto.getAvailabilityId()).orElse(null));

            if (dto.getProfessionIds() != null && !dto.getProfessionIds().isEmpty())
                worker.setProfessions(professionRepo.findAllById(dto.getProfessionIds()));
            if (dto.getJobTypeIds() != null && !dto.getJobTypeIds().isEmpty())
                worker.setJobTypes(jobTypeRepo.findAllById(dto.getJobTypeIds()));
            if (dto.getSkillIds() != null && !dto.getSkillIds().isEmpty())
                worker.setSkills(skillsRepo.findAllById(dto.getSkillIds()));

            Worker saved = workerRepo.save(worker);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();

            String errorMsg = "Error creating worker: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMsg);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Worker> updateWorker(
            @PathVariable Long id,
            @RequestPart("worker") WorkerDTO workerDTO,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {

        Worker updatedWorker = workerService.updateWorker(id,workerDTO, photo);
        return new ResponseEntity<>(updatedWorker, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Worker>> getAllWorkers() {
        List<Worker> workers = workerService.findAllWorkers();
        return new ResponseEntity<>(workers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Worker> getWorkerById(@PathVariable Long id) {
        Worker worker = workerService.findWorkerById(id);
        return new ResponseEntity<>(worker, HttpStatus.OK);
    }

    // Delete a worker
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
        workerService.deleteWorker(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
