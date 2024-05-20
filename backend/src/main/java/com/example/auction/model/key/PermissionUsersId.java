package com.example.auction.model.key;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Getter
@Setter
@Embeddable
public class PermissionUsersId implements Serializable {
    @Column(name = "user_id")
    Long userId;

    @Column(name = "auction_id")
    Long auctionId;
}
