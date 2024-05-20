package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.model.User;
import com.example.auction.repository.AuctionRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuctionController {
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;

    public AuctionController(AuctionRepository auctionRepository, UserRepository userRepository) {
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/auctions")
    public ResponseEntity<List<Auction>> getAuctions() {
        List<Auction> auctions = auctionRepository.findAll();
        return ResponseEntity.ok(auctions);
    }

    @GetMapping("/auctions/{id}")
    public ResponseEntity<Auction> getAuction(@PathVariable Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        return ResponseEntity.ok(auction);
    }

    @PostMapping("/auctions")
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction) {
        User admin = userRepository.findById(auction.getCreated_by().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        auction.setCreated_by(admin);
        auctionRepository.save(auction);
        return new ResponseEntity<>(auction, HttpStatus.OK);
    }

    @PutMapping("/auctions/{id}")
    public ResponseEntity<Auction> updateAuction(@PathVariable Long id, @RequestBody Auction auctionDetails) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        User admin = userRepository.findById(auctionDetails.getCreated_by().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        auction.setTitle(auctionDetails.getTitle());
        auction.setDescription(auctionDetails.getDescription());
        auction.setStart_date(auctionDetails.getStart_date());
        auction.setEnd_date(auctionDetails.getEnd_date());
        auction.setCreated_by(admin);
        Auction updatedAuction = auctionRepository.save(auction);
        return ResponseEntity.ok(updatedAuction);
    }

    @DeleteMapping("/auctions/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAuction(@PathVariable Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        auctionRepository.delete(auction);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
