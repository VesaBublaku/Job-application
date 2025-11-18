package com.jobapplication.system.presentation;

import com.jobapplication.system.application.ExperienceService;
import com.jobapplication.system.domain.Experience;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/experience")
public class ExperienceResource {
    private ExperienceService experienceService;

    public ExperienceResource(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Experience>> getAllExperience() {
        List<Experience> experiences = experienceService.findAllExperiences();
        return new ResponseEntity<>(experiences, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable("id") Long id) {
        Experience experience = experienceService.findExperienceById(id);
        return new ResponseEntity<>(experience, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Experience> addExperience(@RequestBody Experience experience) {
        Experience newExperience = experienceService.addExperience(experience);
        return new ResponseEntity<>(newExperience, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Experience> updateExperience(@RequestBody Experience experience) {
        Experience updatedExperience = experienceService.updateExperience(experience);
        return new ResponseEntity<>(updatedExperience, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable("id") Long id) {
        experienceService.deleteExperience(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
