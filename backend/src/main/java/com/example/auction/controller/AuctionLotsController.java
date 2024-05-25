package com.example.auction.controller;

import com.example.auction.exception.ResourceAlreadyExistException;
import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.model.AuctionLots;
import com.example.auction.model.Lot;
import com.example.auction.model.key.AuctionLotsId;
import com.example.auction.repository.AuctionLotsRepository;
import com.example.auction.repository.AuctionRepository;
import com.example.auction.repository.LotRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuctionLotsController {
    private final AuctionLotsRepository auctionLotsRepository;
    private final AuctionRepository auctionRepository;
    private final LotRepository lotRepository;

    public AuctionLotsController(AuctionLotsRepository auctionLotsRepository, AuctionRepository auctionRepository, LotRepository lotRepository) {
        this.auctionLotsRepository = auctionLotsRepository;
        this.auctionRepository = auctionRepository;
        this.lotRepository = lotRepository;
    }

    @GetMapping("/auction_lots")
    public ResponseEntity<List<AuctionLots>> getAuctionLots() {
        List<AuctionLots> auctionLots = auctionLotsRepository.findAll();
        return ResponseEntity.ok(auctionLots);
    }

    @GetMapping("/auction_lot")
    public ResponseEntity<AuctionLots> getAuctionLot(@RequestBody AuctionLots auctionLotDetails) {
        Auction auction = auctionRepository.findById(auctionLotDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Lot lot = lotRepository.findById(auctionLotDetails.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        AuctionLotsId auctionLotsId = new AuctionLotsId();
        auctionLotsId.setAuctionId(auction.getId());
        auctionLotsId.setLotId(lot.getId());
        AuctionLots auctionLot = auctionLotsRepository.findById(auctionLotsId)
                .orElseThrow(() -> new ResourceNotFoundException("AuctionLot"));
        return ResponseEntity.ok(auctionLot);
    }

    @PostMapping("/auction_lots")
    public ResponseEntity<AuctionLots> createAuctionLot(@RequestBody AuctionLots auctionLotDetails) {
        Auction auction = auctionRepository.findById(auctionLotDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Lot lot = lotRepository.findById(auctionLotDetails.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        AuctionLotsId auctionLotsId = new AuctionLotsId();
        auctionLotsId.setAuctionId(auction.getId());
        auctionLotsId.setLotId(lot.getId());
        AuctionLots auctionLot = new AuctionLots();
        if (auctionLotsRepository.findById(auctionLotsId).isPresent())
                throw new ResourceAlreadyExistException("AuctionLot");
        auctionLot.setId(auctionLotsId);
        auctionLot.setAuction(auction);
        auctionLot.setLot(lot);
        auctionLotsRepository.save(auctionLot);
        return new ResponseEntity<>(auctionLot, HttpStatus.OK);
    }

    @DeleteMapping("/auction_lots")
    public ResponseEntity<Map<String, Boolean>> deleteAuctionLot(@RequestBody AuctionLots auctionLotDetails) {
        Auction auction = auctionRepository.findById(auctionLotDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        Lot lot = lotRepository.findById(auctionLotDetails.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        AuctionLotsId auctionLotsId = new AuctionLotsId();
        auctionLotsId.setAuctionId(auction.getId());
        auctionLotsId.setLotId(lot.getId());
        AuctionLots auctionLot = auctionLotsRepository.findById(auctionLotsId)
                .orElseThrow(() -> new ResourceNotFoundException("AuctionLot"));
        auctionLotsRepository.delete(auctionLot);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
