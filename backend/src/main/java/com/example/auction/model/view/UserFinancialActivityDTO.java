package com.example.auction.model.view;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserFinancialActivityDTO {
    @Id
    @Column(name = "user_id")
    private Integer id;
    private String username;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "balance")
    private Double balance;
    @Column(name = "total_bids")
    private Double totalBids;
    @Column(name = "total_payments")
    private Double totalPayments;
}
