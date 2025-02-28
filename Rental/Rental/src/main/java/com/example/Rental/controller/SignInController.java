package com.example.Rental.controller;

import com.example.Rental.DTO.LoginCred;
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
@RequestMapping("/SignIn")
public class SignInController {
    @Autowired
    TenantRepo tenantRepo;
    @Autowired
    OwnerRepo ownerRepo;

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


}
