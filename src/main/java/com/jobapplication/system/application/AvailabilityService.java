package com.jobapplication.system.application;

import com.jobapplication.system.domain.Availability;
import com.jobapplication.system.infrastructure.AvailabilityRepo;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvailabilityService {
    private AvailabilityRepo availabilityRepo;

    @Autowired
    public AvailabilityService(AvailabilityRepo availabilityRepo) {
        this.availabilityRepo = availabilityRepo;
    }

    public Availability addAvailability(Availability availability) {
        return availabilityRepo.save(availability);
    }

    public List<Availability> findAllAvailability() {
        return availabilityRepo.findAll();
    }

    public Availability updateAvailability(Availability availability) {
        return  availabilityRepo.save(availability);
    }

    @Transactional
    public Availability findAvailabilityById(Long id) {
        return availabilityRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Availability by id" + id + " was not found"));
    }

    @Transactional
    public void deleteAvailability(Long id) {
        if(!availabilityRepo.existsById((id))) {
            throw new EntityNotFoundException("Availability by id" + id +" was not found");
        }
        availabilityRepo.deleteById(id);
    }
}
