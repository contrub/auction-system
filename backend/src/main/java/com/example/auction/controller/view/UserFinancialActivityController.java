package com.example.auction.controller.view;

import com.example.auction.model.view.UserFinancialActivityDTO;
import com.example.auction.repository.view.UserFinancialActivityRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserFinancialActivityController {
    private final UserFinancialActivityRepository userFinancialActivityRepository;

    public UserFinancialActivityController(UserFinancialActivityRepository userFinancialActivityRepository) {
        this.userFinancialActivityRepository = userFinancialActivityRepository;
    }

    @GetMapping("/financial-activity")
    public List<UserFinancialActivityDTO> getUsersFinancialActivity() {
        return userFinancialActivityRepository.findAllOrderByTotalPaymentsDesc();
    }
}
