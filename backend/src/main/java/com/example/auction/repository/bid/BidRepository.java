package com.example.auction.repository.bid;

import com.example.auction.model.dto.stats.UserBidsStatsView;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.bid.Bid;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query(value = "SELECT * FROM \"bid\" b WHERE b.lot_id = :p_lot_id", nativeQuery = true)
    List<Bid> findAllLotBids(@Param("p_lot_id") Long lotId);

    @Query(value = "SELECT * FROM user_bids_stats", nativeQuery = true)
    List<UserBidsStatsView> findAllUserBidsStats();
}
