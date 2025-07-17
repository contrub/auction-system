package com.example.auction.controller.auction;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.auction.Auction;
import com.example.auction.model.user.User;
import com.example.auction.repository.auction.AuctionRepository;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.validation.auction.AuctionValidationService;
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
public class AuctionController {
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;
    private final AuctionValidationService auctionValidationService;

    public AuctionController(AuctionRepository auctionRepository,
                             UserRepository userRepository,
                             AuctionValidationService auctionValidationService) {
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
        this.auctionValidationService = auctionValidationService;
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
    public ResponseEntity<Auction> createAuction(@RequestBody Auction auction, @RequestAttribute String username) {
        ValidationResult validationResult = auctionValidationService.validateUser(auction);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User");

        auction.setAdminId(user.getId());
        auctionRepository.save(auction);
        return new ResponseEntity<>(auction, HttpStatus.OK);
    }

    @PutMapping("/auctions/{id}")
    public ResponseEntity<Auction> updateAuction(@PathVariable Long id, @RequestBody Auction auctionDetails) {
        Auction auction = auctionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));

        ValidationResult validationResult = auctionValidationService.validateUser(auction);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        BeanUtils.copyProperties(auctionDetails, auction, "id", "adminId");
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
