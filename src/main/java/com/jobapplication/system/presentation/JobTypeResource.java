package com.jobapplication.system.presentation;

import com.jobapplication.system.application.JobTypeService;
import com.jobapplication.system.domain.JobType;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/jobType")
public class JobTypeResource {
    private JobTypeService jobTypeService;

    public JobTypeResource(JobTypeService jobTypeService) {
        this.jobTypeService = jobTypeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<JobType>> getAllJobTypes() {
        List<JobType> jobTypes = jobTypeService.findAllJobTypes();
        return new ResponseEntity<>(jobTypes, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<JobType> getJobTypeById(@PathVariable("id") Long id) {
        JobType jobType = jobTypeService.findJobTypeById(id);
        return new ResponseEntity<>(jobType, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<JobType> addJobType(@RequestBody JobType jobType) {
        JobType newJobType = jobTypeService.addJobType(jobType);
        return new ResponseEntity<>(newJobType, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<JobType> updateJobType(@RequestBody JobType jobType) {
        JobType updatedJobType = jobTypeService.updateJobType(jobType);
        return new ResponseEntity<>(updatedJobType, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteJobType(@PathVariable("id") Long id) {
        jobTypeService.deleteJobType(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
