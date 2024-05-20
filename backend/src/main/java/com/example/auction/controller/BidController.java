package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Bid;
import com.example.auction.model.User;
import com.example.auction.repository.BidRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BidController {
    private final BidRepository bidRepository;
    private final UserRepository userRepository;

    public BidController(BidRepository bidRepository, UserRepository userRepository) {
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/bids")
    public ResponseEntity<List<Bid>> getBids() {
        List<Bid> bids = bidRepository.findAll();
        return ResponseEntity.ok(bids);
    }

    @GetMapping("/bids/{id}")
    public ResponseEntity<Bid> getBid(@PathVariable Long id) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bid"));
        return ResponseEntity.ok(bid);
    }

    @PostMapping("/bids")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        User user = userRepository.findById(bid.getBidder().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Bidder"));
        bid.setBidder(user);
        bidRepository.save(bid);
        return new ResponseEntity<>(bid, HttpStatus.OK);
    }

    @PutMapping("/bids/{id}")
    public ResponseEntity<Bid> updateBid(@PathVariable Long id, @RequestBody Bid bidDetails) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bid"));
        User user = userRepository.findById(bidDetails.getBidder().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Bidder"));
        // Lot lot = lotRepository.findById(bidDetails.getLot().getId())
        //         .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        bid.setBidder(user);
        // bid.setLot(lot);
        bid.setAmount(bidDetails.getAmount());
        Bid updatedBid = bidRepository.save(bid);
        return ResponseEntity.ok(updatedBid);
    }

    @DeleteMapping("/bids/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteBid(@PathVariable Long id) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bid"));
        bidRepository.delete(bid);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
