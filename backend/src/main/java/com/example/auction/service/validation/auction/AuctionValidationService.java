package com.example.auction.service.validation.auction;

import com.example.auction.model.auction.Auction;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class AuctionValidationService {
    private final ValidationService validationService;

    private static final int TITLE_MAX_LENGTH = 100;
    private static final int DESCRIPTION_MAX_LENGTH = 255;

    public AuctionValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateUser(Auction auction) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(auction.getTitle(), "Title"))
                .validate(() -> validationService.validateRequired(auction.getStartDate().toString(), "Start Date"))
                .validate(() -> validationService.validateMaxLength(auction.getTitle(), TITLE_MAX_LENGTH, "Title"))
                .validate(() -> validationService.validateMaxLength(auction.getDescription(), DESCRIPTION_MAX_LENGTH, "Description"))
                .getResult();
    }
}
