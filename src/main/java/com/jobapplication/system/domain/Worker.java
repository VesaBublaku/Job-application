package com.jobapplication.system.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Worker implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String photo;
    private Date dateOfBirth;
    private String aboutYou;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonProperty("location")
    private Location location;

    @ManyToMany
    @JoinTable(
            name = "worker_profession",
            joinColumns = @JoinColumn(name = "worker_id"),
            inverseJoinColumns = @JoinColumn(name = "profession_id")
    )
    private List<Profession> professions;

    @ManyToOne
    @JoinColumn(name = "education_id")
    @JsonProperty("education")
    private Education education;

    @ManyToOne
    @JoinColumn(name = "experience_id")
    @JsonProperty("experience")
    private Experience experience;

    @ManyToMany
    @JoinTable(
            name = "worker_jobType",
            joinColumns = @JoinColumn(name = "worker_id"),
            inverseJoinColumns = @JoinColumn(name = "jobType_id")
    )
    private List<JobType> jobTypes;

    @ManyToMany
    @JoinTable(
            name = "worker_skills",
            joinColumns = @JoinColumn(name = "worker_id"),
            inverseJoinColumns = @JoinColumn(name = "skills_id")
    )
    private List<Skills> skills;

    @ManyToOne
    @JoinColumn(name = "compensation_id")
    @JsonProperty("compensation")
    private Compensation compensation;

    @ManyToOne
    @JoinColumn(name = "availability_id")
    @JsonProperty("availability")
    private Availability availability;
}
