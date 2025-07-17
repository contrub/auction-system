package com.example.auction.service.validation.auth;

import com.example.auction.model.dto.auth.UserLoginDto;
import com.example.auction.model.dto.auth.UserRegistrationDto;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class AuthValidationService {
    private final ValidationService validationService;
    
    private static final int USERNAME_MAX_LENGTH = 30;
    private static final int FIRST_NAME_MAX_LENGTH = 50;
    private static final int LAST_NAME_MAX_LENGTH = 50;
    private static final int PASSWORD_MIN_LENGTH = 6;

    public AuthValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validateRegistration(UserRegistrationDto dto) {
        return ValidationChain.create()
            .validate(() -> validationService.validateRequired(dto.getUsername(), "Username"))
            .validate(() -> validationService.validateRequired(dto.getFirstName(), "First name"))
            .validate(() -> validationService.validateRequired(dto.getLastName(), "Last name"))
            .validate(() -> validationService.validateRequired(dto.getPassword(), "Password"))
            .validate(() -> validationService.validateMaxLength(dto.getUsername(), USERNAME_MAX_LENGTH, "Username"))
            .validate(() -> validationService.validateMaxLength(dto.getFirstName(), FIRST_NAME_MAX_LENGTH, "First name"))
            .validate(() -> validationService.validateMaxLength(dto.getLastName(), LAST_NAME_MAX_LENGTH, "Last name"))
            .validate(() -> validationService.validateMinLength(dto.getPassword(), PASSWORD_MIN_LENGTH, "Password"))
            .getResult();
    }

    public ValidationResult validateLogin(UserLoginDto dto) {
        return ValidationChain.create()
            .validate(() -> validationService.validateRequired(dto.getUsername(), "Username"))
            .validate(() -> validationService.validateRequired(dto.getPassword(), "Password"))
            .getResult();
    }
}