package com.example.auction.controller.bid;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.bid.Bid;
import com.example.auction.model.dto.stats.UserBidsStatsView;
import com.example.auction.model.lot.Lot;
import com.example.auction.model.user.User;
import com.example.auction.repository.bid.BidRepository;
import com.example.auction.repository.lot.LotRepository;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.bid.BidValidationService;
import org.springframework.beans.BeanUtils;
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
    private final LotRepository lotRepository;
    private final BidValidationService bidValidationService;

    public BidController(BidRepository bidRepository,
                         UserRepository userRepository,
                         LotRepository lotRepository,
                         BidValidationService bidValidationService) {
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.lotRepository = lotRepository;
        this.bidValidationService = bidValidationService;
    }

    @GetMapping("/bids")
    public ResponseEntity<List<Bid>> getBids() {
        List<Bid> bids = bidRepository.findAll();
        return ResponseEntity.ok(bids);
    }

    @GetMapping("/lots/{lotID}/bids")
    public ResponseEntity<List<Bid>> getLotBids(@PathVariable Long lotID) {
        List<Bid> bids = bidRepository.findAllLotBids(lotID);
        return ResponseEntity.ok(bids);
    }

    @GetMapping("/bids/{id}")
    public ResponseEntity<Bid> getBid(@PathVariable Long id) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bid"));
        return ResponseEntity.ok(bid);
    }

    @GetMapping("/bids/stats")
    public ResponseEntity<List<UserBidsStatsView>> getBidsStats() {
        List<UserBidsStatsView> userBidsStats = bidRepository.findAllUserBidsStats();
        return ResponseEntity.ok(userBidsStats);
    }

    @PostMapping("/bids")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid, @RequestAttribute String username) {
        ValidationResult validationResult = bidValidationService.validateBid(bid);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User");

        Lot lot = lotRepository.findById(bid.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        bid.setLotId(lot.getId());
        bid.setUserId(user.getId());
        bidRepository.save(bid);
        return new ResponseEntity<>(bid, HttpStatus.OK);
    }

    @PutMapping("/bids/{id}")
    public ResponseEntity<Bid> updateBid(@PathVariable Long id, @RequestBody Bid bidDetails, @RequestAttribute String username) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bid"));

        ValidationResult validationResult = bidValidationService.validateBid(bid);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User");

        Lot lot = lotRepository.findById(bidDetails.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        bidDetails.setUserId(user.getId());
        bidDetails.setLotId(lot.getId());
        BeanUtils.copyProperties(bidDetails, bid, "id");
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
