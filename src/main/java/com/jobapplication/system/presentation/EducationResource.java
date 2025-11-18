package com.jobapplication.system.presentation;

import com.jobapplication.system.application.EducationService;
import com.jobapplication.system.domain.Education;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/education")
public class EducationResource {
    private EducationService educationService;

    public EducationResource(EducationService educationService) {
        this.educationService = educationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Education>> getAllEducation() {
        List<Education> educations = educationService.findAllEducation();
        return new ResponseEntity<>(educations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Education> getEducationById(@PathVariable("id") Long id) {
        Education education = educationService.findEducationByID(id);
        return new ResponseEntity<>(education, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Education> addEducation(@RequestBody Education education) {
        Education newEducation = educationService.addEducation(education);
        return new ResponseEntity<>(newEducation, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Education> updateEducation(@RequestBody Education education) {
        Education updatedEducation = educationService.updateEducation(education);
        return new ResponseEntity<>(updatedEducation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable("id") Long id) {
        educationService.deleteEducation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
