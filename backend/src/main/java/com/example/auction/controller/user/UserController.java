package com.example.auction.controller.user;

import com.example.auction.exception.auth.AuthValidationException;
import com.example.auction.exception.auth.ForbiddenException;
import com.example.auction.exception.resource.ResourceAlreadyExistException;
import com.example.auction.exception.resource.ResourceNotFoundException;
import com.example.auction.model.user.User;
import com.example.auction.repository.user.UserRepository;
import com.example.auction.service.validation.user.UserValidationService;
import com.example.auction.service.validation.base.ValidationResult;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;
    private final UserValidationService userValidationService;

    public UserController(UserRepository userRepository, UserValidationService userValidationService) {
        this.userRepository = userRepository;
        this.userValidationService = userValidationService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        ValidationResult validationResult = userValidationService.validateUser(user);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        if (userRepository.findByUsername(user.getUsername()) != null)
            throw new ResourceAlreadyExistException("User");

        userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        ValidationResult validationResult = userValidationService.validateUser(userDetails);
        if (!validationResult.isValid())
            throw new AuthValidationException(validationResult.getMessage());

        BeanUtils.copyProperties(userDetails, user, "id", "username");
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id, @RequestAttribute("username") String username) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        if (user.getUsername().equals(username))
            throw new ForbiddenException("Self-deletion is not permitted");

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
