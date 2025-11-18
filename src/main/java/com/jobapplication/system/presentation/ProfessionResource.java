package com.jobapplication.system.presentation;

import com.jobapplication.system.application.ProfessionService;
import com.jobapplication.system.domain.Profession;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/profession")
public class ProfessionResource {
    private ProfessionService professionService;

    public ProfessionResource(ProfessionService professionService) {
        this.professionService = professionService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Profession>> getAllProfessions() {
        List<Profession> professions = professionService.findAllProfessions();
        return new ResponseEntity<>(professions, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Profession> getProfessionById(@PathVariable("id") Long id) {
        Profession profession = professionService.findProfessionById(id);
        return new ResponseEntity<>(profession, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Profession> addProfession(@RequestBody Profession profession) {
        Profession newProfession = professionService.addProfession(profession);
        return new ResponseEntity<>(newProfession, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Profession> updateProfession(@RequestBody Profession profession) {
        Profession updatedProfession = professionService.updateProfession(profession);
        return new ResponseEntity<>(updatedProfession, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfession(@PathVariable("id") Long id) {
        professionService.deleteProfession(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
