package com.example.auction.repository;

import com.example.auction.model.Lot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LotRepository extends JpaRepository<Lot, Long> {
}
