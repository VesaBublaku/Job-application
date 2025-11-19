package com.jobapplication.system.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobapplication.system.application.EmployerService;
import com.jobapplication.system.domain.Availability;
import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.EmployerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4201", "http://localhost:4200"})
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

    @PutMapping( "/update/{id}")
    public ResponseEntity<?> updateEmployer(
            @PathVariable("id") Long id,
            @RequestPart("employer") String employerJson,
            @RequestPart(value = "logo", required = false) MultipartFile logo
    ) {
        try {
            EmployerDTO dto = objectMapper.readValue(employerJson, EmployerDTO.class);
            Employer updated = employerService.updateEmployer(id, dto, logo);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating employer: " + e.getMessage());
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
}

