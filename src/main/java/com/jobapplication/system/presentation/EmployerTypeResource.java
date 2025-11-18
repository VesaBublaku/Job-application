package com.jobapplication.system.presentation;

import com.jobapplication.system.application.EmployerTypeService;
import com.jobapplication.system.application.NumberOfEmployeesService;
import com.jobapplication.system.domain.EmployerType;
import com.jobapplication.system.domain.NumberOfEmployees;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4201")
@RestController
@RequestMapping("/employerType")
public class EmployerTypeResource {

    private EmployerTypeService employerTypeService;

    public EmployerTypeResource(EmployerTypeService employerTypeService) {
        this.employerTypeService = employerTypeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployerType>> getAllEmployerType() {
        List<EmployerType> employerType = employerTypeService.findAllEmployerTypes();
        return new ResponseEntity<>(employerType, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<EmployerType> getEmployerTypeById(@PathVariable("id") Long id){
        EmployerType employerType = employerTypeService.findEmployerTypeById(id);
        return new ResponseEntity<>(employerType, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<EmployerType> addEmployerType(@RequestBody EmployerType employerType) {
        EmployerType newEmployerType = employerTypeService.addEmployerType(employerType);
        return new ResponseEntity<>(newEmployerType, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<EmployerType> updateEmployerType(@RequestBody EmployerType employerType) {
        EmployerType updatedEmployerType = employerTypeService.updateEmployerType(employerType);
        return new ResponseEntity<>(updatedEmployerType, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployerType(@PathVariable("id") Long id) {
        employerTypeService.deleteEmployerType(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
