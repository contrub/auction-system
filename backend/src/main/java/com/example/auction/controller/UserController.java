package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.User;
import com.example.auction.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAuctions() {
        return userRepository.findAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getAuctionById(@PathVariable Long id) {
        User auction = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));
        return ResponseEntity.ok(auction);
    }

    @PostMapping("/users")
    public User createAuction(@RequestBody User auction) {
        return userRepository.save(auction);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateAuction(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));

        user.setFirst_name(userDetails.getFirst_name());
        user.setLast_name(userDetails.getLast_name());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteAuction(@PathVariable Long id) {
        User auction = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Auction not exist with id : " + id));

        userRepository.delete(auction);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
