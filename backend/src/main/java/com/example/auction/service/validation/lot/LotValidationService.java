package com.example.auction.service.validation.lot;

import com.example.auction.model.lot.Lot;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class LotValidationService {
    private final ValidationService validationService;

    private static final int TITLE_MAX_LENGTH = 100;
    private static final int DESCRIPTION_MAX_LENGTH = 255;

    public LotValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateCategory(Lot lot) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(lot.getTitle(), "Title"))
                .validate(() -> validationService.validateRequired(lot.getAmount(), "Amount"))
                .validate(() -> validationService.validateMaxLength(lot.getTitle(), TITLE_MAX_LENGTH, "Title"))
                .validate(() -> validationService.validateMaxLength(lot.getDescription(), DESCRIPTION_MAX_LENGTH, "Description"))
                .getResult();
    }
}
