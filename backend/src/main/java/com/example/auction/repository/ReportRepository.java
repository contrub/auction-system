package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.Report;

public interface ReportRepository extends JpaRepository<Report, Long> {
}
