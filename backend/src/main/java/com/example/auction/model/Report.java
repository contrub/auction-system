package com.example.auction.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "\"report\"")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "user_id", nullable = false)
    private User reported_by;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot reported_lot;

    @Column(nullable = false)
    private String description;
}
