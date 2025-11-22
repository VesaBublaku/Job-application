package com.jobapplication.system.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobapplication.system.application.*;
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
    @Autowired
    private LocationService locationService;
    @Autowired
    private EducationService educationService;
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private CompensationService compensationService;
    @Autowired
    private AvailabilityService availabilityService;
    @Autowired
    private ProfessionService professionService;
    @Autowired
    private SkillsService skillsService;
    @Autowired
    private JobTypeService jobTypeService;


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
            worker.setPassword(workerService.hashPassword(dto.getPassword()));
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
    public ResponseEntity<?> updateWorker(
            @PathVariable Long id,
            @RequestPart("worker") WorkerDTO workerDTO,
            @RequestPart(value = "photo", required = false) MultipartFile photo
    ) {
        Worker worker = workerService.findWorkerById(id);

        worker.setFirstName(workerDTO.getFirstName());
        worker.setLastName(workerDTO.getLastName());
        worker.setEmail(workerDTO.getEmail());
        worker.setDateOfBirth(workerDTO.getDateOfBirth());
        worker.setAboutYou(workerDTO.getAboutYou());

        worker.setLocation(locationService.findLocationById(workerDTO.getLocationId()));
        worker.setEducation(educationService.findEducationByID(workerDTO.getEducationId()));
        worker.setExperience(experienceService.findExperienceById(workerDTO.getExperienceId()));
        worker.setCompensation(compensationService.findCompensationById(workerDTO.getCompensationId()));
        worker.setAvailability(availabilityService.findAvailabilityById(workerDTO.getAvailabilityId()));

        worker.setProfessions(professionService.findAllByIds(workerDTO.getProfessionIds()));
        worker.setSkills(skillsService.findAllByIds(workerDTO.getSkillIds()));
        worker.setJobTypes(jobTypeService.findAllByIds(workerDTO.getJobTypeIds()));

        if (workerDTO.getPassword() != null) {
            worker.setPassword(workerService.hashPassword(workerDTO.getPassword()));
        }

        if (photo != null) {
            String photoName = workerService.savePhoto(photo);
            worker.setPhoto(photoName);
        }

        workerService.updateWorker(worker.getId(), workerDTO, photo);

        return ResponseEntity.ok(worker);
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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWorker(@PathVariable Long id) {
        workerService.deleteWorker(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Worker>> searchWorkers(
            @RequestParam(required = false) Long professionId,
            @RequestParam(required = false) Long compensationId,
            @RequestParam(required = false) Long jobTypeId,
            @RequestParam(required = false) Long availabilityId,
            @RequestParam(required = false) Long experienceId,
            @RequestParam(required = false) Long educationId,
            @RequestParam(required = false) Long locationId
    ) {
        List<Worker> workers = workerService.searchWorkers(professionId, compensationId, jobTypeId, availabilityId, experienceId, educationId, locationId);
        return ResponseEntity.ok(workers);
    }
}
