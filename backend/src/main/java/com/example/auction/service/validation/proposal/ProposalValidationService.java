package com.example.auction.service.validation.proposal;

import com.example.auction.model.payment.Payment;
import com.example.auction.model.proposal.Proposal;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class ProposalValidationService {
    private final ValidationService validationService;

    private static final int DESCRIPTION_MAX_LENGTH = 255;

    public ProposalValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateProposal(Proposal proposal) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(proposal.getDescription(), "Description"))
                .validate(() -> validationService.validateMaxLength(proposal.getDescription(), DESCRIPTION_MAX_LENGTH, "Description"))
                .getResult();
    }
}
