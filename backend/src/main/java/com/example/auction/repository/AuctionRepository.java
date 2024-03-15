package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.Auction;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
}