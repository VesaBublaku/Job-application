package com.jobapplication.system.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class Employer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String companyLogo;
    private String yearOfFounding;
    private String aboutCompany;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = true)
    private String password;

    @ManyToOne
    @JoinColumn(name = "location_id")
    @JsonProperty("location")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "numberOfEmployees_id")
    @JsonProperty("numberOfEmployees")
    private NumberOfEmployees numberOfEmployees;

    @ManyToOne
    @JoinColumn(name = "industry")
    @JsonProperty("industry")
    private Industry industry;

    @ManyToOne
    @JoinColumn(name = "employerType_id")
    @JsonProperty("employerType")
    private EmployerType employerType;

    @ManyToOne
    @JoinColumn(name = "experience_id")
    @JsonProperty("experience")
    private Experience experience;

    @ManyToOne
    @JoinColumn(name = "availability_id")
    @JsonProperty("availability")
    private Availability availability;

    @ManyToOne
    @JoinColumn(name = "compensation_id")
    @JsonProperty("compensation")
    private Compensation compensation;

    @ManyToMany
    @JoinTable(
            name = "employer_jobType",
            joinColumns = @JoinColumn(name = "employer_id"),
            inverseJoinColumns = @JoinColumn(name = "jobType_id")
    )
    private List<JobType> jobTypes;

}
