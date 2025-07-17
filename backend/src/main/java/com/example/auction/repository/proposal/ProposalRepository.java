package com.example.auction.repository.proposal;

import com.example.auction.model.dto.stats.LotProposalsStatsView;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.proposal.Proposal;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    @Query(value = "SELECT * FROM \"proposal\" p WHERE p.lot_id = :p_lot_id", nativeQuery = true)
    List<Proposal> findAllLotProposals(@Param("p_lot_id") Long lotId);

    @Query(value = "SELECT * FROM lot_proposals_stats", nativeQuery = true)
    List<LotProposalsStatsView> findAllLotProposalsStats();
}
