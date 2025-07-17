package com.example.auction.service.validation.user;

import com.example.auction.model.user.User;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class UserValidationService {
    private final ValidationService validationService;

    private static final int USERNAME_MAX_LENGTH = 30;
    private static final int FIRST_NAME_MAX_LENGTH = 50;
    private static final int LAST_NAME_MAX_LENGTH = 50;

    public UserValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateUser(User user) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(user.getUsername(), "Username"))
                .validate(() -> validationService.validateRequired(user.getFirstName(), "First name"))
                .validate(() -> validationService.validateRequired(user.getLastName(), "Last name"))
                .validate(() -> validationService.validateMaxLength(user.getUsername(), USERNAME_MAX_LENGTH, "Username"))
                .validate(() -> validationService.validateMaxLength(user.getFirstName(), FIRST_NAME_MAX_LENGTH, "First name"))
                .validate(() -> validationService.validateMaxLength(user.getLastName(), LAST_NAME_MAX_LENGTH, "Last name"))
                .getResult();
    }
}
