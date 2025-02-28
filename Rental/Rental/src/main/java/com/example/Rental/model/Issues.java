package com.example.Rental.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Issues")
public class Issues {
    @Id
    String Issue_id;
    @DBRef
    Tenants tenants;
    @DBRef
    Owners owners;
    String description;
    String issue_type;
    String severity;
    int estimated_day;
    LocalDateTime posted_on;
    String status;

    public String getIssue_id() {
        return Issue_id;
    }

    public void setIssue_id(String issue_id) {
        Issue_id = issue_id;
    }

    public Tenants getTenants() {
        return tenants;
    }

    public void setTenants(Tenants tenants) {
        this.tenants = tenants;
    }

    public Owners getOwners() {
        return owners;
    }

    public void setOwners(Owners owners) {
        this.owners = owners;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIssue_type() {
        return issue_type;
    }

    public void setIssue_type(String issue_type) {
        this.issue_type = issue_type;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public int getEstimated_day() {
        return estimated_day;
    }

    public void setEstimated_day(int estimated_day) {
        this.estimated_day = estimated_day;
    }

    public LocalDateTime getPosted_on() {
        return posted_on;
    }

    public void setPosted_on(LocalDateTime posted_on) {
        this.posted_on = posted_on;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
