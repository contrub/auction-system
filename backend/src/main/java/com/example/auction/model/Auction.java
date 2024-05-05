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
    private Long id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "admin_id", nullable = false)
    private User created_by;

    @Column(length = 100, nullable = false)
    private String title;

    @Column
    private String description;

    @Column(nullable = false)
    private LocalDate start_date = LocalDate.now();

    @Column
    private LocalDate end_date;
}
