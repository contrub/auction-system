package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.Block;

public interface BlockRepository extends JpaRepository<Block, Long> {
}
