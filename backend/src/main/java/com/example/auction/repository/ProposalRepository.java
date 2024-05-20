package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.Proposal;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
}
