package com.example.auction.repository;

import com.example.auction.model.AuctionLots;
import com.example.auction.model.key.AuctionLotsId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionLotsRepository extends JpaRepository<AuctionLots, AuctionLotsId> {
}
