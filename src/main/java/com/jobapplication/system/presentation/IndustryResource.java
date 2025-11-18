package com.jobapplication.system.presentation;

import com.jobapplication.system.application.IndustryService;
import com.jobapplication.system.domain.Industry;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/industry")
public class IndustryResource {

    private IndustryService industryService;

    public IndustryResource(IndustryService industryService) {
        this.industryService = industryService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Industry>> getAllIndustry() {
        List<Industry> industry = industryService.findAllIndustry();
        return new ResponseEntity<>(industry, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Industry> getIndustryById(@PathVariable("id") Long id){
        Industry industry = industryService.findIndustryById(id);
        return new ResponseEntity<>(industry, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Industry> addIndustry(@RequestBody Industry industry) {
        Industry newIndustry = industryService.addIndustry(industry);
        return new ResponseEntity<>(newIndustry, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Industry> updateIndustry(@RequestBody Industry industry) {
        Industry updatedIndustry = industryService.updateIndustry(industry);
        return new ResponseEntity<>(updatedIndustry, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteIndustry(@PathVariable("id") Long id) {
        industryService.deleteIndustry(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
