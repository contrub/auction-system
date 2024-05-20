package com.example.auction.model;
import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;
import com.example.auction.model.key.AuctionLotsId;

@Entity
@Getter
@Setter
@Table(name = "\"auction_lots\"")
public class AuctionLots {
    @EmbeddedId
    private AuctionLotsId id;

    @ManyToOne
    @MapsId("auctionId")
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;

    @ManyToOne
    @MapsId("lotId")
    @JoinColumn(name = "lot_id", nullable = false)
    private Lot lot;
}
