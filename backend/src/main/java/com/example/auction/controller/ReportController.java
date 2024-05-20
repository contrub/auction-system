package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Report;
import com.example.auction.model.User;
import com.example.auction.model.Lot;
import com.example.auction.repository.LotRepository;
import com.example.auction.repository.ReportRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ReportController {
    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final LotRepository lotRepository;

    public ReportController(ReportRepository reportRepository, UserRepository userRepository, LotRepository lotRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.lotRepository = lotRepository;
    }

    @GetMapping("/reports")
    public ResponseEntity<List<Report>> getReports() {
        List<Report> reports = reportRepository.findAll();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/reports/{id}")
    public ResponseEntity<Report> getReport(@PathVariable Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report"));
        return ResponseEntity.ok(report);
    }

    @PostMapping("/reports")
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        User user = userRepository.findById(report.getReported_by().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        Lot lot = lotRepository.findById(report.getReported_lot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        report.setReported_by(user);
        report.setReported_lot(lot);
        reportRepository.save(report);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @PutMapping("/reports/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable Long id, @RequestBody Report reportDetails) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report"));
        User user = userRepository.findById(reportDetails.getReported_by().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        Lot lot = lotRepository.findById(reportDetails.getReported_lot().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Lot"));
        report.setReported_by(user);
        report.setReported_lot(lot);
        report.setDescription(reportDetails.getDescription());
        Report updatedReport = reportRepository.save(report);
        return ResponseEntity.ok(updatedReport);
    }

    @DeleteMapping("/reports/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReport(@PathVariable Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Report"));
        reportRepository.delete(report);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
