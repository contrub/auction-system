package com.example.auction.controller.proposal;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.dto.stats.LotProposalsStatsView;
import com.example.auction.model.lot.Lot;
import com.example.auction.model.user.User;
import com.example.auction.model.proposal.Proposal;
import com.example.auction.repository.lot.LotRepository;
import com.example.auction.repository.proposal.ProposalRepository;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.proposal.ProposalValidationService;
import org.springframework.beans.BeanUtils;
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
    private final ProposalValidationService proposalValidationService;

    public ProposalController(
            ProposalRepository proposalRepository,
            UserRepository userRepository,
            LotRepository lotRepository,
            ProposalValidationService proposalValidationService) {
        this.proposalRepository = proposalRepository;
        this.userRepository = userRepository;
        this.lotRepository = lotRepository;
        this.proposalValidationService = proposalValidationService;
    }

    @GetMapping("/proposals")
    public ResponseEntity<List<Proposal>> getProposals() {
        List<Proposal> proposals = proposalRepository.findAll();
        return ResponseEntity.ok(proposals);
    }

    @GetMapping("/lots/{lotID}/proposals")
    public ResponseEntity<List<Proposal>> getLotProposals(@PathVariable Long lotID) {
        List<Proposal> proposals = proposalRepository.findAllLotProposals(lotID);
        return ResponseEntity.ok(proposals);
    }

    @GetMapping("/proposals/{id}")
    public ResponseEntity<Proposal> getProposal(@PathVariable Long id) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal"));
        return ResponseEntity.ok(proposal);
    }

    @GetMapping("/proposals/stats")
    public ResponseEntity<List<LotProposalsStatsView>> getProposalStats() {
        List<LotProposalsStatsView> lotProposalsView = proposalRepository.findAllLotProposalsStats();
        return ResponseEntity.ok(lotProposalsView);
    }

    @PostMapping("/proposals")
    public ResponseEntity<Proposal> createProposal(@RequestBody Proposal proposal, @RequestAttribute String username) {
        ValidationResult validationResult = proposalValidationService.validateProposal(proposal);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        Lot lot = lotRepository.findById(proposal.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User");

        proposal.setLotId(lot.getId());
        proposal.setUserId(user.getId());
        proposalRepository.save(proposal);
        return new ResponseEntity<>(proposal, HttpStatus.OK);
    }

    @PutMapping("/proposals/{id}")
    public ResponseEntity<Proposal> updateProposal(@PathVariable Long id, @RequestBody Proposal proposalDetails) {
        Proposal proposal = proposalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proposal"));

        ValidationResult validationResult = proposalValidationService.validateProposal(proposal);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        Lot lot = lotRepository.findById(proposalDetails.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        User user = userRepository.findById(proposalDetails.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        proposalDetails.setLotId(lot.getId());
        proposalDetails.setUserId(user.getId());
        BeanUtils.copyProperties(proposalDetails, proposal, "id");
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
