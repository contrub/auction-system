package com.example.auction.service.validation.payment;

import com.example.auction.model.payment.Payment;
import com.example.auction.service.validation.base.ValidationChain;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.base.ValidationService;
import org.springframework.stereotype.Service;

@Service
public class PaymentValidationService {
    private final ValidationService validationService;

    public PaymentValidationService(ValidationService validationService) {
        this.validationService = validationService;
    }

    public ValidationResult validatePayment(Payment payment) {
        return ValidationChain.create()
                .validate(() -> validationService.validateRequired(payment.getAmount(), "Amount"))
                .getResult();
    }
}
