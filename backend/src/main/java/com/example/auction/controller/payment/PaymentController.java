package com.example.auction.controller.payment;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.resource.ResourceAlreadyExistException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.lot.Lot;
import com.example.auction.model.payment.Payment;
import com.example.auction.model.user.User;
import com.example.auction.repository.lot.LotRepository;
import com.example.auction.repository.payment.PaymentRepository;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.validation.base.ValidationResult;
import com.example.auction.service.validation.payment.PaymentValidationService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PaymentController {
    private final PaymentRepository paymentRepository;
    private final LotRepository lotRepository;
    private final UserRepository userRepository;
    private final PaymentValidationService paymentValidationService;

    public PaymentController(PaymentRepository paymentRepository,
                             UserRepository userRepository,
                             LotRepository lotRepository,
                             PaymentValidationService paymentValidationService) {
        this.paymentRepository = paymentRepository;
        this.lotRepository = lotRepository;
        this.userRepository = userRepository;
        this.paymentValidationService = paymentValidationService;
    }

    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/payments/{id}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment"));
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment, @RequestAttribute String username) {
        Lot lot = lotRepository.findById(payment.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        Payment existedPayment = paymentRepository.findByLot(payment.getLotId());
        if (existedPayment != null)
            return ResponseEntity.ok(existedPayment);;

        Payment winnerPayment = paymentRepository.determineWinner(payment.getLotId());

        ValidationResult validationResult = paymentValidationService.validatePayment(payment);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        User user = userRepository.findById(winnerPayment.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        winnerPayment.setUserId(user.getId());
        winnerPayment.setLotId(lot.getId());
        paymentRepository.save(winnerPayment);
        return new ResponseEntity<>(winnerPayment, HttpStatus.OK);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails, @RequestAttribute String username) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment"));

        ValidationResult validationResult = paymentValidationService.validatePayment(payment);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        User user = userRepository.findByUsername(username);
        if (user == null)
            throw new ResourceNotFoundException("User");

        Lot lot = lotRepository.findById(payment.getLotId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));

        paymentDetails.setUserId(user.getId());
        paymentDetails.setLotId(lot.getId());
        BeanUtils.copyProperties(paymentDetails, payment, "id");
        Payment updatedPayment = paymentRepository.save(payment);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/payments/{id}")
    public ResponseEntity<Map<String, Boolean>> deletePayment(@PathVariable Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment"));
        paymentRepository.delete(payment);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
