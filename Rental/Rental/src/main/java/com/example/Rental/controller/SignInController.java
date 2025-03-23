package com.example.Rental.controller;

import com.example.Rental.DTO.LoginCred;
import com.example.Rental.model.Owners;
import com.example.Rental.model.Tenants;
import com.example.Rental.model.Vendors;
import com.example.Rental.repository.OwnerRepo;
import com.example.Rental.repository.TenantRepo;
import com.example.Rental.repository.VendorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/SignIn")
public class SignInController {
    @Autowired
    TenantRepo tenantRepo;
    @Autowired
    OwnerRepo ownerRepo;
    @Autowired
    VendorRepo vendorRepo;

    @PostMapping("/owner")
    public ResponseEntity<?> signInOwner(@RequestBody LoginCred loginCred) {
        System.out.println(loginCred.getEmail()+loginCred.getPassword());
        Owners existingOwner = ownerRepo.findByEmailAndPassword(loginCred.getEmail(), loginCred.getPassword());

        if (existingOwner != null) {
            return ResponseEntity.ok(existingOwner);
        } else {
            if(ownerRepo.findByEmail(loginCred.getEmail())==null){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Sign Up required!!!!");
            }else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Credentials");
            }
        }
    }
    @PostMapping("/tenant")
    public ResponseEntity<?> signInTenant(@RequestBody LoginCred loginCred){
        System.out.println(loginCred.getEmail()+loginCred.getPassword());
        Tenants tenant=tenantRepo.findByEmailAndPassword(loginCred.getEmail(),loginCred.getPassword());
        if(tenant!=null){
            System.out.println(tenant.getTenant_id());
            return ResponseEntity.ok(tenant);
        }else{
            if(tenantRepo.findByEmail(loginCred.getEmail())==null){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Sign UP Required!!!");
            }else{
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Credential");
            }
        }

    }

    @PostMapping("/vendor")
    public ResponseEntity<?> signInVendor(@RequestBody LoginCred loginCred) {
        System.out.println(loginCred.getEmail() + loginCred.getPassword());
        Vendors vendors = vendorRepo.findByEmailAndPassword(loginCred.getEmail(), loginCred.getPassword());
        if (vendors != null) {
            System.out.println(vendors.getVendor_id());
            return ResponseEntity.ok(vendors);
        } else {
            if (tenantRepo.findByEmail(loginCred.getEmail()) == null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Sign UP Required!!!");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Credential");
            }
        }
    }
}
