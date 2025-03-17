package com.example.Rental.controller;


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
@CrossOrigin("http://localhost:5173")
@RequestMapping("/SignUp")
public class SignUpController {
    @Autowired
    private TenantRepo tenantRepo;
    @Autowired
    private OwnerRepo ownerRepo;
    @Autowired
    private VendorRepo vendorRepo;

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
    @PostMapping("/Vendors")
    public ResponseEntity<?> signUpVendor(@RequestBody Vendors vendor){
        Vendors existingvendor =vendorRepo.findByEmail(vendor.getEmail());
        if(existingvendor ==null){
            vendorRepo.save(vendor);
//            System.out.println(vendor.getTenant_id()+" "+vendor.getTenant_name());
            return ResponseEntity.ok(vendor);
        }else{
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Vendor already Exists");
        }
    }
}
