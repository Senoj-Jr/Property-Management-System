package com.example.Rental.controller;


import com.example.Rental.model.Issues;
import com.example.Rental.repository.IssuesRepo;
import com.example.Rental.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Vendor")
public class VendorController {
    @Autowired
    VendorService vendorService;
    @Autowired
    IssuesRepo issuesRepo;
    // API for a vendor to accept an issue
    @PostMapping("/{issueId}/accept/{vendorId}")
    public ResponseEntity<?> acceptIssue(@PathVariable String issueId, @PathVariable String vendorId) {
        vendorService.acceptIssue(issueId, vendorId);
        return ResponseEntity.ok("Vendor accepted the issue!");
    }

    // API for a vendor to reject an issue
    @PostMapping("/{issueId}/reject/{vendorId}")
    public ResponseEntity<?> rejectIssue(@PathVariable String issueId, @PathVariable String vendorId) {
        vendorService.rejectIssue(issueId, vendorId);
        return ResponseEntity.ok("Vendor rejected the issue!");
    }

    @GetMapping("/Issue-list/{vendorId}")
    public ResponseEntity<?> IssueList(@PathVariable String vendorId){
        List<Issues> issues=issuesRepo.findByActiveRequestsVendorId(vendorId);
        return ResponseEntity.ok(issues);
    }

}
