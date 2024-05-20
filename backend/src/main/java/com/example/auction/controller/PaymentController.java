package com.example.auction.controller;

import com.example.auction.exception.ResourceAlreadyExistException;
import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Lot;
import com.example.auction.model.Payment;
import com.example.auction.model.User;
import com.example.auction.repository.LotRepository;
import com.example.auction.repository.PaymentRepository;
import com.example.auction.repository.UserRepository;
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

    public PaymentController(PaymentRepository paymentRepository, UserRepository userRepository, LotRepository lotRepository) {
        this.paymentRepository = paymentRepository;
        this.lotRepository = lotRepository;
        this.userRepository = userRepository;
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
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        if (paymentRepository.findByLot(payment.getLot().getId()) != null)
            throw new ResourceAlreadyExistException("Payment");
        User payer = userRepository.findById(payment.getPaying_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        Lot lot = lotRepository.findById(payment.getLot().getId())
               .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        payment.setPaying_user(payer);
        payment.setLot(lot);
        paymentRepository.save(payment);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment"));
        User payer = userRepository.findById(payment.getPaying_user().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        Lot lot = lotRepository.findById(payment.getLot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        payment.setPaying_user(payer);
        payment.setLot(lot);
        payment.setAmount(paymentDetails.getAmount());
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
