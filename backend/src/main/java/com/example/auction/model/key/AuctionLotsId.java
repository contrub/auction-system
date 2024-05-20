package com.example.auction.model.key;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
public class AuctionLotsId implements Serializable {
    @Column(name = "auction_id")
    Long auctionId;

    @Column(name = "lot_id")
    Long lotId;
}
