package com.example.auction.repository.auction;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.auction.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}
