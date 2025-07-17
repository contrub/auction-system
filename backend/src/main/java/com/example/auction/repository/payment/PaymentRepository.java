package com.example.auction.repository.payment;

import com.example.auction.model.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query(value = "SELECT * FROM \"payment\" p WHERE p.lot_id = :p_lot_id", nativeQuery = true)
    Payment findByLot(@Param("p_lot_id") Long lotId);

    @Query(value = "SELECT * FROM determine_winner(CAST(:p_lot_id AS INTEGER))", nativeQuery = true)
    Payment determineWinner(@Param("p_lot_id") Long lotId);
}
