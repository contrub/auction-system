package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
