package com.jobapplication.system.presentation;

import com.jobapplication.system.application.SkillsService;
import com.jobapplication.system.domain.Skills;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/skills")
public class SkillsResource {
    private SkillsService skillsService;

    public SkillsResource(SkillsService skillsService) {
        this.skillsService = skillsService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Skills>> getAllSkills() {
        List<Skills> skills = skillsService.findAllSkills();
        return new ResponseEntity<>(skills, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Skills> getSkillsById(@PathVariable("id") Long id) {
        Skills skill = skillsService.findSkillById(id);
        return new ResponseEntity<>(skill, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Skills> addSkills(@RequestBody Skills skills) {
        Skills newSkill = skillsService.addSkills(skills);
        return new ResponseEntity<>(newSkill, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Skills> updateSkills(@RequestBody Skills skills) {
        Skills updatedSkill = skillsService.updateSkills(skills);
        return new ResponseEntity<>(updatedSkill, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSkills(@PathVariable("id") Long id) {
        skillsService.deleteSkill(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }
}
