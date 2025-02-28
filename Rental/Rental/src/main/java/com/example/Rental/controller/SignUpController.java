package com.example.Rental.controller;


import com.example.Rental.model.Owners;
import com.example.Rental.model.Tenants;
import com.example.Rental.repository.OwnerRepo;
import com.example.Rental.repository.TenantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/SignUp")
public class SignUpController {
    @Autowired
    private TenantRepo tenantRepo;
    @Autowired
    private OwnerRepo ownerRepo;


    @PostMapping("/Owners")
    public ResponseEntity<?> signUpOwner(@RequestBody Owners owner) {
        Owners existingOwner = ownerRepo.findByEmail(owner.getEmail());

        if (existingOwner == null) {
            ownerRepo.save(owner);
            return ResponseEntity.ok(owner);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Owner already exists");
        }
    }
    @PostMapping("/Tenants")
    public ResponseEntity<?> signUpTenant(@RequestBody Tenants tenant){
        Tenants existingTenant=tenantRepo.findByEmail(tenant.getEmail());
        if(existingTenant==null){
            tenantRepo.save(tenant);
//            System.out.println(tenant.getTenant_id()+" "+tenant.getTenant_name());
            return ResponseEntity.ok(tenant);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Tenant already Exists");
        }
    }
}
