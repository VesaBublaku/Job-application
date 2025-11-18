package com.jobapplication.system.presentation;

import com.jobapplication.system.application.AvailabilityService;
import com.jobapplication.system.domain.Availability;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/availability")
public class AvailabilityResource {
    private AvailabilityService availabilityService;

    public AvailabilityResource(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Availability>> getAllAvailability() {
        List<Availability> availabilities = availabilityService.findAllAvailability();
        return new ResponseEntity<>(availabilities, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Availability> getAvailabilityById(@PathVariable("id") Long id) {
        Availability availability = availabilityService.findAvailabilityById(id);
        return new ResponseEntity<>(availability, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Availability> addAvailability(@RequestBody Availability availability) {
        Availability newAvailability = availabilityService.addAvailability(availability);
        return new ResponseEntity<>(newAvailability, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Availability> updateAvailability(@RequestBody Availability availability) {
        Availability updatedAvailability = availabilityService.updateAvailability(availability);
        return new ResponseEntity<>(updatedAvailability, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAvailability(@PathVariable("id") Long id) {
        availabilityService.deleteAvailability(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
