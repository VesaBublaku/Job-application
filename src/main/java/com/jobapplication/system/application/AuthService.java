package com.jobapplication.system.application;

import com.jobapplication.system.domain.Employer;
import com.jobapplication.system.domain.Worker;
import com.jobapplication.system.infrastructure.EmployerRepo;
import com.jobapplication.system.infrastructure.WorkerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Service
public class AuthService {

    @Autowired
    private EmployerRepo employerRepo;

    @Autowired
    private WorkerRepo workerRepo;


    public Employer registerEmployer(Employer employer) {
        employer.setPassword(hashPassword(employer.getPassword()));
        return employerRepo.save(employer);
    }

    public Worker registerWorker(Worker worker) {
        worker.setPassword(hashPassword(worker.getPassword()));
        return workerRepo.save(worker);
    }

    public Employer loginEmployer(String email, String password) {
        Employer emp = employerRepo.findByEmail(email);
        if (emp != null && emp.getPassword().equals(hashPassword(password))) {
            return emp;
        }
        return null;
    }

    public Worker loginWorker(String email, String password) {
        Worker w = workerRepo.findByEmail(email);
        if (w != null && w.getPassword().equals(hashPassword(password))) {
            return w;
        }
        return null;
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashed = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashed) sb.append(String.format("%02x", b));
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
}
