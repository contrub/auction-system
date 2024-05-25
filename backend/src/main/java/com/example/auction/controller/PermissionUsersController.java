package com.example.auction.controller;

import com.example.auction.exception.ResourceAlreadyExistException;
import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.model.Auction;
import com.example.auction.model.PermissionUsers;
import com.example.auction.model.User;
import com.example.auction.model.key.PermissionUsersId;
import com.example.auction.repository.AuctionRepository;
import com.example.auction.repository.PermissionUsersRepository;
import com.example.auction.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PermissionUsersController {
    private final PermissionUsersRepository permissionUsersRepository;
    private final AuctionRepository auctionRepository;
    private final UserRepository userRepository;

    public PermissionUsersController(PermissionUsersRepository permissionUsersRepository, AuctionRepository auctionRepository, UserRepository userRepository) {
        this.permissionUsersRepository = permissionUsersRepository;
        this.auctionRepository = auctionRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/permission_users")
    private ResponseEntity<List<PermissionUsers>> getPermissionUsers() {
        List<PermissionUsers> permissionUsers = permissionUsersRepository.findAll();
        return ResponseEntity.ok(permissionUsers);
    }

    @GetMapping("/permission_user")
    private ResponseEntity<PermissionUsers> getPermissionUser(@RequestBody PermissionUsers permissionUsersDetails) {
        Auction auction = auctionRepository.findById(permissionUsersDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        User user = userRepository.findById(permissionUsersDetails.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        PermissionUsersId permissionUsersId = new PermissionUsersId();
        permissionUsersId.setAuctionId(auction.getId());
        permissionUsersId.setUserId(user.getId());
        PermissionUsers permissionUser = permissionUsersRepository.findById(permissionUsersId)
                .orElseThrow(() -> new ResourceNotFoundException("PermissionUser"));
        return ResponseEntity.ok(permissionUser);
    }

    @PostMapping("/permission_users")
    private ResponseEntity<PermissionUsers> createPermissionUser(@RequestBody PermissionUsers permissionUserDetails) {
        Auction auction = auctionRepository.findById(permissionUserDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        User user = userRepository.findById(permissionUserDetails.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        PermissionUsersId permissionUsersId = new PermissionUsersId();
        permissionUsersId.setAuctionId(auction.getId());
        permissionUsersId.setUserId(user.getId());
        PermissionUsers permissionUser = new PermissionUsers();
        if (permissionUsersRepository.findById(permissionUsersId).isPresent())
            throw new ResourceAlreadyExistException("PermissionUsers");
        permissionUser.setId(permissionUsersId);
        permissionUser.setUser(user);
        permissionUser.setAuction(auction);
        permissionUsersRepository.save(permissionUser);
        return ResponseEntity.ok(permissionUser);
    }

    @DeleteMapping("/permission_users")
    private ResponseEntity<Map<String, Boolean>> deletePermissionUser(@RequestBody PermissionUsers permissionUserDetails) {
        Auction auction = auctionRepository.findById(permissionUserDetails.getAuction().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Auction"));
        User user = userRepository.findById(permissionUserDetails.getUser().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        PermissionUsersId permissionUsersId = new PermissionUsersId();
        permissionUsersId.setAuctionId(auction.getId());
        permissionUsersId.setUserId(user.getId());
        PermissionUsers permissionUser = permissionUsersRepository.findById(permissionUsersId)
                .orElseThrow(() -> new ResourceNotFoundException("PermissionUser"));
        permissionUsersRepository.delete(permissionUser);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
