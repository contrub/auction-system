package com.example.auction.repository.view;

import com.example.auction.model.view.UserFinancialActivityDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFinancialActivityRepository extends JpaRepository<UserFinancialActivityDTO, Long> {
    @Query(value = "SELECT * FROM user_financial_activity ORDER BY total_payments DESC", nativeQuery = true)
    List<UserFinancialActivityDTO> findAllOrderByTotalPaymentsDesc();
}