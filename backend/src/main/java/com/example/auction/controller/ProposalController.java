package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.model.Lot;
import com.example.auction.model.User;
import com.example.auction.model.Proposal;
import com.example.auction.repository.AuctionRepository;
import com.example.auction.repository.LotRepository;
import com.example.auction.repository.ProposalRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ProposalController {
    private final ProposalRepository proposalRepository;
    private final UserRepository userRepository;
    private final LotRepository lotRepository;
    private final AuctionRepository auctionRepository;

    public ProposalController(ProposalRepository proposalRepository, UserRepository userRepository, LotRepository lotRepository, AuctionRepository auctionRepository) {
        this.proposalRepository = proposalRepository;
        this.userRepository = userRepository;
        this.lotRepository = lotRepository;
        this.auctionRepository = auctionRepository;
    }

    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getProposals() {
        List<Proposal> proposals = proposalRepository.findAll();
        return ResponseEntity.ok(proposals);
    }

    @GetMapping("/proposals/{id}")
    public ResponseEntity<Proposal> getProposal(@PathVariable Long id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal"));
        return ResponseEntity.ok(proposal);
    }

    @PostMapping("/proposals")
    public ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal) {
        Auction auction = auctionRepository.findById(proposal.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Lot lot = lotRepository.findById(proposal.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        User user = userRepository.findById(proposal.getRecruiter().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        proposal.setAuction(auction);
        proposal.setLot(lot);
        proposal.setRecruiter(user);
        proposalRepository.save(proposal);
        return new ResponseEntity<>(proposal, HttpStatus.OK);
    }

    @PutMapping("/proposals/{id}")
    public ResponseEntity<Proposal> updateProposal(@PathVariable Long id, @RequestBody Proposal proposalDetails) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal"));
        Auction auction = auctionRepository.findById(proposalDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Lot lot = lotRepository.findById(proposalDetails.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        User user = userRepository.findById(proposalDetails.getRecruiter().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        proposal.setAuction(auction);
        proposal.setLot(lot);
        proposal.setRecruiter(user);
        proposal.setDescription(proposalDetails.getDescription());
        Proposal updatedProposal = proposalRepository.save(proposal);
        return ResponseEntity.ok(updatedProposal);
    }

    @DeleteMapping("/proposals/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProposal(@PathVariable Long id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal"));
        proposalRepository.delete(proposal);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
