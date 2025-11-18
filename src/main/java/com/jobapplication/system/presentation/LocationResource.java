package com.jobapplication.system.presentation;

import com.jobapplication.system.application.IndustryService;
import com.jobapplication.system.application.LocationService;
import com.jobapplication.system.domain.Industry;
import com.jobapplication.system.domain.Location;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/location")
public class LocationResource {

    private LocationService locationService;

    public LocationResource(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> location = locationService.findAllLocations();
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable("id") Long id){
        Location location = locationService.findLocationById(id);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {
        Location newLocation = locationService.addLocation(location);
        return new ResponseEntity<>(newLocation, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location) {
        Location updatedLocation = locationService.updateLocation(location);
        return new ResponseEntity<>(updatedLocation, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable("id") Long id) {
        locationService.deleteLocation(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
