package com.jobapplication.system.presentation;

import com.jobapplication.system.application.CompensationService;
import com.jobapplication.system.domain.Compensation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/compensation")
public class CompensationResource {
    private CompensationService compensationService;

    public CompensationResource(CompensationService compensationService) {
        this.compensationService = compensationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Compensation>> getAllCompensation() {
        List<Compensation> compensations = compensationService.findAllCompensation();
        return new ResponseEntity<>(compensations, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Compensation> getCompensationById(@PathVariable("id") Long id) {
        Compensation compensation = compensationService.findCompensationById(id);
        return new ResponseEntity<>(compensation, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Compensation> addCompensation(@RequestBody Compensation compensation) {
        Compensation newCompensation = compensationService.addCompensation(compensation);
        return new ResponseEntity<>(newCompensation, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Compensation> updateCompensation(@RequestBody Compensation compensation) {
        Compensation updatedCompensation = compensationService.updateCompensation(compensation);
        return new ResponseEntity<>(updatedCompensation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCompensation(@PathVariable("id") Long id) {
        compensationService.deleteCompensationById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
