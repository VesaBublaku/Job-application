package com.jobapplication.system.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JobType implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String jobType;

    @ManyToMany(mappedBy = "jobTypes")
    @JsonIgnore
    private List<Worker> workers;

    @ManyToMany(mappedBy = "jobTypes")
    @JsonIgnore
    private List<Employer> employers;

}
