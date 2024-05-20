package com.example.auction.model;

import com.example.auction.model.key.PermissionUsersId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "\"permission_users\"")
public class PermissionUsers {
    @EmbeddedId
    private PermissionUsersId id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "auction_id", nullable = false)
    private Auction auction;
}