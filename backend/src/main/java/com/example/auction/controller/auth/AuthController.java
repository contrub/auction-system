package com.example.auction.controller.auth;

import com.example.auction.datasource.UserCredentialStore;
import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.auth.UnauthorizedException;
import com.example.auction.model.dto.auth.UserLoginDto;
import com.example.auction.model.dto.auth.UserRegistrationDto;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.JwtService;
import com.example.auction.service.PgAuthService;
import com.example.auction.service.validation.auth.AuthValidationService;
import com.example.auction.service.validation.base.ValidationResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PgAuthService pgAuthService;
    private final JwtService jwtService;
    private final AuthValidationService authValidationService;
    private final List<String> reservedUsernames = List.of("admin", "recruiter", "participant");
    private final UserCredentialStore credentialStore;

    @Value("${app.default.role:participant}")
    private String userRole;

    public AuthController (UserRepository userRepository,
                           PgAuthService pgAuthService,
                           JwtService jwtService,
                           AuthValidationService authValidationService,
                           UserCredentialStore credentialStore) {
        this.userRepository = userRepository;
        this.pgAuthService = pgAuthService;
        this.jwtService = jwtService;
        this.authValidationService = authValidationService;
        this.credentialStore = credentialStore;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationDto userRegistrationDto) {
        if (reservedUsernames.contains(userRegistrationDto.getUsername()))
            throw new AuthValidationException("Username is reserved");

        ValidationResult validationResult = authValidationService.validateRegistration(userRegistrationDto);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        if (userRepository.findByUsername(userRegistrationDto.getUsername()) != null)
            throw new AuthValidationException("Username already exists");

        userRepository.registerUser(userRegistrationDto.getUsername(), userRegistrationDto.getFirstName(),
                                    userRegistrationDto.getLastName(), userRegistrationDto.getPassword(),
                                    userRole);

        credentialStore.store(userRegistrationDto.getUsername(), userRegistrationDto.getPassword());

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", List.of(userRole.toUpperCase()));

        String jwt = jwtService.generateToken(claims, userRegistrationDto.getUsername());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registered successful");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);

        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginDto userLoginDto) {
        ValidationResult validationResult = authValidationService.validateLogin(userLoginDto);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        if (!pgAuthService.isExists(userLoginDto.getUsername(), userLoginDto.getPassword()))
            throw new UnauthorizedException("User not found");

        credentialStore.store(userLoginDto.getUsername(), userLoginDto.getPassword());

        Map<String, Object> claims = new HashMap<>();
        List<String> userRoles = userRepository.getRoles(userLoginDto.getUsername());
        List<String> roleClaims = userRoles.stream().map(role -> "ROLE_" + role.toUpperCase()).toList();
        claims.put("roles", roleClaims);

        String jwt = jwtService.generateToken(claims, userLoginDto.getUsername());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);

        return ResponseEntity.ok()
                .headers(headers)
                .body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestAttribute String username) {
        credentialStore.remove(username);
        Map<String, Boolean> response = new HashMap<>();
        response.put("logout", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/role")
    public ResponseEntity<HashMap<String, List<String>>> getRole(@RequestAttribute String username) {
        List<String> userRoles = userRepository.getRoles(username);
        HashMap<String, List<String>> roles = new HashMap<>();
        roles.put("roles", userRoles);

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userRoles);

        String jwt = jwtService.generateToken(claims, username);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + jwt);

        return ResponseEntity.ok()
                .headers(headers)
                .body(roles);
    }
}