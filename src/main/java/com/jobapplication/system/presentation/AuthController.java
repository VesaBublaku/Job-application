package com.jobapplication.system.presentation;

import com.jobapplication.system.application.AuthService;
import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.Worker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4201")
public class AuthController {

    @Autowired
    private AuthService authService;
    @PostMapping("/register/employer")
    public Employer registerEmployer(@RequestBody Employer employer) {
        return authService.registerEmployer(employer);
    }

    @PostMapping("/register/worker")
    public Worker registerWorker(@RequestBody Worker worker) {
        return authService.registerWorker(worker);
    }

    @PostMapping("/login/employer")
    public ResponseEntity<?> loginEmployer(@RequestBody Employer emp) {
        Employer employer = authService.loginEmployer(emp.getEmail(), emp.getPassword());
        if (employer == null) return ResponseEntity.status(401).body("Invalid email or password");
        return ResponseEntity.ok(employer);
    }

    @PostMapping("/login/worker")
    public ResponseEntity<?> loginWorker(@RequestBody Worker w) {
        Worker worker = authService.loginWorker(w.getEmail(), w.getPassword());
        if (worker == null) return ResponseEntity.status(401).body("Invalid email or password");
        return ResponseEntity.ok(worker);
    }
}
