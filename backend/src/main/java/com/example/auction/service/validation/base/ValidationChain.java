package com.example.auction.service.validation.base;


import java.util.function.Supplier;

public class ValidationChain {
    private ValidationResult firstError;

    public static ValidationChain create() {
        return new ValidationChain();
    }

    public ValidationChain validate(Supplier<ValidationResult> validation) {
        if (firstError == null) {
            ValidationResult result = validation.get();
            if (!result.isValid()) {
                firstError = result;
            }
        }
        return this;
    }

    public ValidationResult getResult() {
        return firstError != null ? firstError : ValidationResult.success();
    }
}
