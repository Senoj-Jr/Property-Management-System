package com.example.Rental.controller;


import com.example.Rental.DTO.IssueCred;
import com.example.Rental.DTO.TenantRequestCred;
import com.example.Rental.service.TenantRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Tenant")
public class TenantController {
    @Autowired
    TenantRequestService tenantRequestService;
    @PostMapping("/Owner-Request")
    public ResponseEntity<?> RequestOwner(@RequestBody TenantRequestCred tenantRequestCred) {
        return tenantRequestService.createRequest(tenantRequestCred.getId(), tenantRequestCred.getEmail(), tenantRequestCred.getMessage(),tenantRequestCred.getAddress(),tenantRequestCred.getLocation());
    }

    @PostMapping("/Raise-issue")
    public ResponseEntity<?> PostIssue(@RequestBody IssueCred issueCred){
        System.out.println(issueCred.getOwner_id()+ issueCred.getTenant_id()+issueCred.getStatement()+issueCred.getType()+issueCred.getPosted()+issueCred.getEstimated_Days());
        return tenantRequestService.raiseIssue(issueCred.getOwner_id(), issueCred.getTenant_id(),issueCred.getStatement(),issueCred.getType(),issueCred.getPosted(),issueCred.getEstimated_Days());
    }
}
