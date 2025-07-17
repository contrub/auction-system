package com.example.auction.controller.lot;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.auction.Auction;
import com.example.auction.model.category.Category;
import com.example.auction.model.lot.Lot;
import com.example.auction.repository.auction.AuctionRepository;
import com.example.auction.repository.category.CategoryRepository;
import com.example.auction.repository.lot.LotRepository;
import com.example.auction.service.validation.lot.LotValidationService;
import com.example.auction.service.validation.base.ValidationResult;
import org.springframework.beans.BeanUtils;
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
    private final LotValidationService lotValidationService;

    public LotController(
            LotRepository lotRepository,
            AuctionRepository auctionRepository,
            CategoryRepository categoryRepository,
            LotValidationService lotValidationService) {
        this.lotRepository = lotRepository;
        this.auctionRepository = auctionRepository;
        this.categoryRepository = categoryRepository;
        this.lotValidationService = lotValidationService;
    }

    @GetMapping("/lots")
    public ResponseEntity<List<Lot>> getLots() {
        List<Lot> lots = lotRepository.findAll();
        return ResponseEntity.ok(lots);
    }

    @GetMapping("/auctions/{id}/lots")
    public ResponseEntity<List<Lot>> getAuctionLots(@PathVariable Long id) {
        List<Lot> lots = lotRepository.findAllAuctionLots(id);
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
        ValidationResult validationResult = lotValidationService.validateCategory(lot);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        Auction auction = auctionRepository.findById(lot.getAuctionId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        Category category = categoryRepository.findById(lot.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        lot.setAuctionId(auction.getId());
        lot.setCategoryId(category.getId());
        lotRepository.save(lot);
        return new ResponseEntity<>(lot, HttpStatus.OK);
    }

    @PutMapping("/lots/{id}")
    public ResponseEntity<Lot> updateLot(@PathVariable Long id, @RequestBody Lot lotDetails) {
        Lot lot = lotRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lot not found"));

        ValidationResult validationResult = lotValidationService.validateCategory(lot);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        Auction auction = auctionRepository.findById(lotDetails.getAuctionId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction not found"));

        Category category = categoryRepository.findById(lotDetails.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        lotDetails.setAuctionId(auction.getId());
        lotDetails.setCategoryId(category.getId());
        BeanUtils.copyProperties(lotDetails, lot, "id");
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
