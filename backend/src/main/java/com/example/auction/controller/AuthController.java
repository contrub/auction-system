package com.example.auction.controller;

import com.example.auction.exception.ResourceNotFoundException;
import com.example.auction.exception.UnauthorizedException;
import com.example.auction.model.auth.PgUser;
import com.example.auction.service.JwtService;
import com.example.auction.service.PgRoleService;
import com.example.auction.service.PgUserService;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private PgUserService pgUserService;
    private PgRoleService pgRoleService;
    private JwtService jwtService;

    public AuthController (PgUserService pgUserService, PgRoleService pgRoleService, JwtService jwtService) {
        this.pgUserService = pgUserService;
        this.pgRoleService = pgRoleService;
        this.jwtService = jwtService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody PgUser pgUser) {
        pgUserService.createUser(pgUser.getUsename(), pgUser.getPasswd());
        String jwt = jwtService.generateToken(pgUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registered successful");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);
        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody PgUser pgUser) {
        if (pgUserService.isExists(pgUser.getUsename(), pgUser.getPasswd())) {
            String jwt = jwtService.generateToken(pgUser);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful");
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + jwt);
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(response);
        }
        throw new UnauthorizedException();
    }

    @GetMapping("/role")
    public ResponseEntity<String> getRole(@RequestHeader PgUser pgUser) {
        String role = pgRoleService.getRole(pgUser.getUsename());
        return ResponseEntity.ok(role);
    }
}
