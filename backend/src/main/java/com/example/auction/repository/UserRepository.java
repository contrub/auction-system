package com.example.auction.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.auction.model.User;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.username = ?1")
    User findByUsername(String name);
}