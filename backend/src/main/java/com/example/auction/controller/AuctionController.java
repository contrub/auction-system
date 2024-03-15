package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuctionController {
    @Autowired
    private AuctionRepository auctionRepository;

    @GetMapping("/auctions")
    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

    @GetMapping("/auctions/{id}")
    public ResponseEntity<Auction> getAuctionById(@PathVariable Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));
        return ResponseEntity.ok(auction);
    }

    @PostMapping("/auctions")
    public Auction createAuction(@RequestBody Auction auction) {
        return auctionRepository.save(auction);
    }

    @PutMapping("/auctions/{id}")
    public ResponseEntity<Auction> updateAuction(@PathVariable Long id, @RequestBody Auction auctionDetails) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));

        auction.setTitle(auctionDetails.getTitle());
        auction.setDescription(auctionDetails.getDescription());

        Auction updatedAuction = auctionRepository.save(auction);
        return ResponseEntity.ok(updatedAuction);
    }

    @DeleteMapping("/auctions/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAuction(@PathVariable Long id) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));

        auctionRepository.delete(auction);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
