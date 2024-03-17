package com.example.auction.model;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "\"AuctionLots\"")
public class AuctionLots {
    @Id
    @ManyToOne
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;

    @Id
    @ManyToOne
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;
}
