package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.model.Category;
import com.example.auction.model.Lot;
import com.example.auction.repository.AuctionRepository;
import com.example.auction.repository.CategoryRepository;
import com.example.auction.repository.LotRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LotController {
    private final LotRepository lotRepository;
    private final AuctionRepository auctionRepository;
    private final CategoryRepository categoryRepository;

    public LotController(LotRepository lotRepository, AuctionRepository auctionRepository, CategoryRepository categoryRepository) {
        this.lotRepository = lotRepository;
        this.auctionRepository = auctionRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/lots")
    public ResponseEntity<List<Lot>> getLots() {
        List<Lot> lots = lotRepository.findAll();
        return ResponseEntity.ok(lots);
    }

    @GetMapping("/lots/{id}")
    public ResponseEntity<Lot> getLot(@PathVariable Long id) {
        Lot lot = lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        return ResponseEntity.ok(lot);
    }

    @PostMapping("/lots")
    public ResponseEntity<Lot> createLot(@RequestBody Lot lot) {
        Auction auction = auctionRepository.findById(lot.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Category category = categoryRepository.findById(lot.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category"));
        lot.setAuction(auction);
        lot.setCategory(category);
        lotRepository.save(lot);
        return new ResponseEntity<>(lot, HttpStatus.OK);
    }

    @PutMapping("/lots/{id}")
    public ResponseEntity<Lot> updateLot(@PathVariable Long id, @RequestBody Lot lotDetails) {
        Lot lot = lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        Auction auction = auctionRepository.findById(lotDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Category category = categoryRepository.findById(lotDetails.getCategory().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Category"));
        lot.setAuction(auction);
        lot.setCategory(category);
        lot.setAmount(lotDetails.getAmount());
        lot.setTitle(lotDetails.getTitle());
        lot.setDescription(lotDetails.getDescription());
        Lot updatedLot = lotRepository.save(lot);
        return ResponseEntity.ok(updatedLot);
    }

    @DeleteMapping("/lots/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteLot(@PathVariable Long id) {
        Lot lot = lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        lotRepository.delete(lot);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
