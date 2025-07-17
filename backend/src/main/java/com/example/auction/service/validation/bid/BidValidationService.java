package com.example.auction.service.validation.bid;

import com.example.auction.model.bid.Bid;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class BidValidationService {
    private final ValidationService validationService;

    public BidValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateBid(Bid bid) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(bid.getAmount(), "Amount"))
                .getResult();
    }
}
