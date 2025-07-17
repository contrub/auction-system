package com.example.auction.repository.lot;

import com.example.auction.model.lot.Lot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LotRepository extends JpaRepository<Lot, Long> {
    @Query(value = "SELECT * FROM \"lot\" l WHERE l.auction_id = :p_auction_id", nativeQuery = true)
    List<Lot> findAllAuctionLots(@Param("p_auction_id") Long auctionId);
}
