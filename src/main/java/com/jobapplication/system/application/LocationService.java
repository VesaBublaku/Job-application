package com.jobapplication.system.application;

import com.jobapplication.system.domain.Industry;
import com.jobapplication.system.domain.Location;
import com.jobapplication.system.infrastructure.IndustryRepo;
import com.jobapplication.system.infrastructure.LocationRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private LocationRepo locationRepo;

    @Autowired
    public LocationService(LocationRepo locationRepo) {
        this.locationRepo = locationRepo;
    }

    public Location addLocation(Location location) {
        return locationRepo.save(location);
    }

    public List<Location> findAllLocations() {
        return locationRepo.findAll();
    }

    public Location updateLocation(Location location) {
        return locationRepo.save(location);
    }

    public Location findLocationById(Long id) {
        return locationRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Location with id " + id + " was not found"));
    }

    @Transactional
    public void deleteLocation(Long id) {
        if(!locationRepo.existsById(id)) {
            throw new EntityNotFoundException("Industry by id" + id + "was not found");
        }
        locationRepo.deleteById(id);
    }
}
