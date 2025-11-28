package com.jobapplication.system.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobapplication.system.application.EmployerService;
import com.jobapplication.system.application.*;
import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.EmployerDTO;
import com.jobapplication.system.infrastructure.EmployerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201" )
@RestController
@RequestMapping("/employers")
public class EmployerResource {
    private final EmployerService employerService;

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private EmployerTypeService employerTypeService;
    @Autowired
    private NumberOfEmployeesService numberOfEmployeesService;
    @Autowired
    private CompensationService compensationService;
    @Autowired
    private AvailabilityService availabilityService;
    @Autowired
    private ExperienceService experienceService;
    @Autowired
    private IndustryService industryService;
    @Autowired
    private LocationService locationService;
    @Autowired
    private EmployerRepo employerRepo;

    public EmployerResource(EmployerService employerService) {
        this.employerService = employerService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addEmployer(
            @RequestPart("employer") String employerJson,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        try {
            System.out.println("Received JSON: " + employerJson);
            EmployerDTO dto = objectMapper.readValue(employerJson, EmployerDTO.class);
            Employer employer = employerService.addEmployer(dto, logo);
            return ResponseEntity.ok(employer);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating employer: " + e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateEmployer(
            @PathVariable Long id,
            @RequestPart("employer") String employerJson,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        try {
            EmployerDTO employerDTO = objectMapper.readValue(employerJson, EmployerDTO.class);
            Employer updatedEmployer = employerService.updateEmployer(id, employerDTO, logo);
            return ResponseEntity.ok(updatedEmployer);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating employer: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Employer>> getAll() {
        List<Employer> employers = employerService.findAllEmployers();
        return  new ResponseEntity<>(employers, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Employer> getEmployerById(@PathVariable("id") Long id) {
        Employer employer = employerService.findEmployerById(id);
        return new ResponseEntity<>(employer, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployer(@PathVariable("id") Long id) {
        employerService.deleteEmployer(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Employer>> searchEmployers(
            @RequestParam(required = false) String companyName,
            @RequestParam(required = false) Long industryId,
            @RequestParam(required = false) Long compensationId,
            @RequestParam(required = false) Long jobTypeId,
            @RequestParam(required = false) Long availabilityId,
            @RequestParam(required = false) Long experienceId,
            @RequestParam(required = false) Long locationId
    ) {
        List<Employer> employers = employerService.searchEmployers(companyName, industryId, compensationId, jobTypeId, availabilityId, experienceId, locationId);
        return ResponseEntity.ok(employers);
    }

    @GetMapping("/recent")
    public List<Employer> getRecentEmployers() {
        return employerRepo.findTop4ByOrderByIdDesc();
    }

    @GetMapping("/byEmployer/{id}")
    public ResponseEntity<List<Employer>> getJobsByEmployer(@PathVariable Long id) {
        List<Employer> jobs = employerService.findByCreatedByEmployerId(id);
        return ResponseEntity.ok(jobs);
    }
}

