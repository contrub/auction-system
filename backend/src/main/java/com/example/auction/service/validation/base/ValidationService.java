package com.example.auction.service.validation.base;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class ValidationService {
    public ValidationResult validateRequired(String value, String fieldName) {
        if (value == null || value.trim().isEmpty()) {
            return ValidationResult.error(fieldName + " is required");
        }
        return ValidationResult.success();
    }

    public ValidationResult validateRequired(Double value, String fieldName) {
        if (value == null) {
            return ValidationResult.error(fieldName + " is required");
        }
        if (value.isNaN() || value.isInfinite()) {
            return ValidationResult.error(fieldName + " must be a valid number");
        }
        return ValidationResult.success();
    }

    public ValidationResult validateMaxLength(String value, int maxLength, String fieldName) {
        if (value != null && value.length() > maxLength) {
            return ValidationResult.error(fieldName + " must be " + maxLength + " characters or less");
        }
        return ValidationResult.success();
    }
    
    public ValidationResult validateMinLength(String value, int minLength, String fieldName) {
        if (value != null && value.length() < minLength) {
            return ValidationResult.error(fieldName + " must be at least " + minLength + " characters");
        }
        return ValidationResult.success();
    }

    public ValidationResult validatePattern(String value, String pattern, String fieldName) {
        if (value != null && !Pattern.matches(pattern, value)) {
            return ValidationResult.error(fieldName + " " + " not match pattern");
        }
        return ValidationResult.success();
    }
}