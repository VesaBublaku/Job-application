package com.jobapplication.system.presentation;

import com.jobapplication.system.application.LocationService;
import com.jobapplication.system.application.NumberOfEmployeesService;
import com.jobapplication.system.domain.Location;
import com.jobapplication.system.domain.NumberOfEmployees;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/numberOfEmployees")
public class NumberOfEmployeesResource {

    private NumberOfEmployeesService numberOfEmployeesService;

    public NumberOfEmployeesResource(NumberOfEmployeesService numberOfEmployeesService) {
        this.numberOfEmployeesService = numberOfEmployeesService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<NumberOfEmployees>> getAllNumberOfEmployees() {
        List<NumberOfEmployees> numberOfEmployees = numberOfEmployeesService.findAllNumberOfEmployees();
        return new ResponseEntity<>(numberOfEmployees, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<NumberOfEmployees> getNumberOfEmployeesById(@PathVariable("id") Long id){
        NumberOfEmployees numberOfEmployees = numberOfEmployeesService.findNumberOfEmployeesById(id);
        return new ResponseEntity<>(numberOfEmployees, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<NumberOfEmployees> addNumberOfEmployees(@RequestBody NumberOfEmployees numberOfEmployees) {
        NumberOfEmployees newNumberOfEmployees = numberOfEmployeesService.addNumberOfEmployees(numberOfEmployees);
        return new ResponseEntity<>(newNumberOfEmployees, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<NumberOfEmployees> updateNumberOfEmployees(@RequestBody NumberOfEmployees numberOfEmployees) {
        NumberOfEmployees updatedNumberOfEmployees = numberOfEmployeesService.updateNumberOfEmployees(numberOfEmployees);
        return new ResponseEntity<>(updatedNumberOfEmployees, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNumberOfEmployees(@PathVariable("id") Long id) {
        numberOfEmployeesService.deleteNumberOfEmployees(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
