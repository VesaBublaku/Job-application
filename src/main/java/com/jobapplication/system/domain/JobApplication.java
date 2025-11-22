package com.jobapplication.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonIgnoreProperties({"applications", "hibernateLazyInitializer", "handler"})
public class JobApplication implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Worker worker;

    @ManyToOne(fetch = FetchType.EAGER)
    private Employer employer;

    @Column(nullable = false)
    private Long jobId;

    @Column(nullable = false)
    private String status = "PENDING";
}
