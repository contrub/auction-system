package com.example.auction.service.validation.category;

import com.example.auction.model.category.Category;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class CategoryValidationService {
    private final ValidationService validationService;

    private static final int TITLE_MAX_LENGTH = 255;
    private static final int DESCRIPTION_MAX_LENGTH = 100;

    public CategoryValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateCategory(Category category) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(category.getTitle(), "Title"))
                .validate(() -> validationService.validateMaxLength(category.getTitle(), TITLE_MAX_LENGTH, "Title"))
                .validate(() -> validationService.validateMaxLength(category.getDescription(), DESCRIPTION_MAX_LENGTH, "Description"))
                .getResult();
    }
}

