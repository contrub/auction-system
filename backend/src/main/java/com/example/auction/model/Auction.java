package com.example.auction.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "\"auction\"")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auctionId;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "admin_id", nullable = false)
    private User createdBy;

    @Column(length = 100, nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private LocalDate startDate = LocalDate.now();

    @Column
    private LocalDate endDate;
}
