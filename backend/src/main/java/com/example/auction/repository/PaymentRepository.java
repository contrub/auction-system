package com.example.auction.repository;

import com.example.auction.model.Payment;
import com.example.auction.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT l FROM Lot l WHERE l.id = ?1")
    User findByLot(Long id);
}
