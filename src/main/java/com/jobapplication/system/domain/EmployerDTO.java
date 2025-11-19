package com.jobapplication.system.domain;

import lombok.Data;

import java.util.List;

@Data
public class EmployerDTO {

    private String companyName;
    private String companyLogo;
    private String yearOfFounding;
    private String aboutCompany;
    private String email;
    private String password;

    private Long locationId;
    private Long industryId;
    private Long experienceId;
    private Long availabilityId;
    private Long compensationId;
    private Long numberOfEmployeesId;
    private Long employerTypeId;
    private List<JobTypeDTO> jobTypes;
}
