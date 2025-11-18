package com.jobapplication.system.domain;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class WorkerDTO {

    private String firstName;
    private String lastName;
    private String aboutYou;
    private String photo;
    private Date dateOfBirth;
    private String email;
    private String password;

    private Long locationId;
    private Long educationId;
    private Long experienceId;
    private Long compensationId;
    private Long availabilityId;

    private List<Long> professionIds;
    private List<Long> jobTypeIds;
    private List<Long> skillIds;


}
