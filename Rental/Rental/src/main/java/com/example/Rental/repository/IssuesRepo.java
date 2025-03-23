package com.example.Rental.repository;


import com.example.Rental.model.Issues;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssuesRepo extends MongoRepository<Issues,String> {

    @Query("{'owners.$id': ?0}")
    List<Issues> findAllIssueById(ObjectId objectId);
    @Query("{'owners.$id': ?0, 'status': 'Pending'}")
    List<Issues> findPendingIssueById(ObjectId objectId);

    List<Issues> findByActiveRequestsVendorId(String vendorId);
}
