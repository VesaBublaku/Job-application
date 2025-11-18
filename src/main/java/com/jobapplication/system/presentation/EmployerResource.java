package com.jobapplication.system.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobapplication.system.application.EmployerService;
import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.EmployerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/employers")
public class EmployerResource {

    private final EmployerService employerService;

    @Autowired
    private ObjectMapper objectMapper;

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

    @PutMapping("/update/{id}")
    public Employer updateEmployer(@PathVariable Long id, @RequestBody Employer employer) {
        return employerService.updateEmployer(id, employer);
    }

    @GetMapping("/all")
    public List<Employer> getAll() {
        return employerService.findAllEmployers();
    }

    @GetMapping("/{id}")
    public Employer getById(@PathVariable Long id) {
        return employerService.findEmployerById(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employerService.deleteEmployer(id);
    }
}

