package com.example.auction.model.dto.stats;

public interface UserBidsStatsView {
    Long getUserId();
    String getUsername();
    Long getTotalBids();
    Double getBidsSum();
}
